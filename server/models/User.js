const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const Schema = mongoose.Schema;

const SALT=10

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: { type: String }
});

UserSchema.pre('save',function(next){
      var user=this
      if(user.isModified('password')){
        bcrypt.genSalt(SALT,function(err,salt){
          if(err) return next(err)
          bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err)
            user.password=hash
            next()
          })
        })
      }
      else{
        next()
      }
})

UserSchema.methods.comparePassword=function(condidatPassword,cb){
bcrypt.compare(condidatPassword,this.password,function(err,isMatch){
  if(err) return cb(err)
  cb(null,isMatch)
})

}

UserSchema.methods.generateToken=function(cb){
  var user=this
var token=jwt.sign(user._id.toHexString(),process.env.SECRET)

user.token=token
user.save(function(err,user){
  if(err) return cb(err)
  cb(null,user)
})
}

UserSchema.statics.findByToken=function(token,cb){
var user=this
jwt.verify(token,process.env.SECRET,function(err,decode){
  user.findOne({'_id':decode,'token':token},function(err,user){
      if(err) return cb(err)
      cb(null,user)
  })
})
}

module.exports = User = mongoose.model("users", UserSchema);
