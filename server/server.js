const path=require('path')
const express = require("express");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const app = express();
require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DATABASE,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to db...");
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieparser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//Models
const User = require("./models/User");
const Brand = require("./models/Brand");
const Wood = require("./models/Wood");
const Product = require("./models/Product");
const { Site } = require("./models/Site");

//Midlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

// const smtpTransport=nodeMailer.createTransport({
//     service:"smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth:{
//         user:"hamdi.snipy@gmail.com",
//         pass:"enim2011@@"
//     },
//     // tls:{ rejectUnauthorized: false}
// })

// var mail={
//     from:"Hamdi <hamdi.snipy@gmail.com>",
//     To:'hamdi.hadjkhlifa@gmail.com',
//     subject:"send Test Email",
//     text:"Testing mails",
//     html:"<b>Hellow,It's Works</b>"
// }

// smtpTransport.sendMail(mail,function(err,response){
//     if(err) {console.log(err)}
//     else {
//         console.log('email.sent')
//     }
//     smtpTransport.close()
// })

// smtpTransport.verify((err, success) => {
//     if (err) console.error(err);
//     console.log('Your config is correct');
// });
//======================
//    Users
//=======================
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
  });
});
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //Find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res
        .status(400)
        .json({ loginSuccess: false, message: "Auth Failed,email not found" });
    //Check the password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res
          .status(400)
          .json({ loginSuccess: false, message: "Wrong Password" });
      //Gnearate the token
      user.generateToken((err, user) => {
        if (err) return res.status(400).json(err);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          token: user.token,
        });
      });
    });
  });
});

app.post("/api/users/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    }
  );
});

app.get('/api/users/removeimage',auth,(req,res)=>{
  let image_id=req.query.public_id
  cloudinary.uploader.destroy(image_id,(error,result)=>{
      if(error) return res.json({succcess:false,error})
      res.status(200).send('ok')
  })
})
//======================
//    Brand
//=======================

app.post("/api/product/brand", auth, admin, (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc,
    });
  });
});

app.get("/api/product/brands", (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).json({ success: false });
    res.status(200).send(brands);
  });
});

//======================
//    Woods
//=======================

app.post("/api/product/wood", auth, (req, res) => {
  const wood = new Wood(req.body);
  wood.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({
      success: true,
      wood: doc,
    });
  });
});

app.get("/api/product/woods", (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) return res.status(400).json({ success: false });
    res.status(200).send(woods);
  });
});

//======================
//    Products
//=======================
app.post("/api/product/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs["publish"] = true;
  Product.find(findArgs)
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles,
      });
    }); 
});

app.post("/api/product/article", auth, admin, (req, res) => {
  // console.log(req.body)
  const product = new Product(req.body);
  product.save((err, doc) => {
    console.log(doc)
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      articles: doc,
    });
  });
});

app.get("/api/product/articles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === "array") {
    let ids = items.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }
  Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("wood")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});
/* By Arrival */
//articles?sortBy=createdAt&order=desc&limit=4
app.get("/api/product/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  Product.find()
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(articles);
    });
});

app.post("/api/users/addToCart", auth, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false;
    doc.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    });

    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId),
        },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        () => {
          if (err) return res.json({ succcess: false, err });
          res.status(200).json(doc.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json({ succcess: false, err });
          res.status(200).json(doc.cart);
        }
      );
    }
  });
});

app.get("/api/users/removeFromCart", auth, (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map((item) => {
        return mongoose.Types.ObjectId(item.id);
      });
      Product.find({ _id: { $in: array } })
        .populate("brand")
        .populate("wood")
        .exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart,
          });
        });
    }
  );
});

app.post("/api/users/scuccessBuy", auth, (req, res) => {
  //User History
  //Payments Dash
});

app.post("/api/users/update_profile", auth, (req, res) => {
  console.log(req.user);
  console.log(req.body);
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body,
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

//=========================
//          Site
//========================

app.get("/api/site/site_data", (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(site[0].siteInfo);
  });
});

app.post("/api/site/site_data", (req, res) => {
  Site.findOneAndUpdate(
    { name: "Site" },
    { $set: { siteInfo: req.body } },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ succcess: false, err });
      return res.status(200).json({
        succcess: true,
        siteInfo: doc.siteInfo,
      });
    }
  );
});

//serve static assets in production
if(process.env.NODE_ENV==='production'){
  //set a static folder
  app.use(express.static('client/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
