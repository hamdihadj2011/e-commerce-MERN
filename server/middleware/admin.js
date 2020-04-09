let admin=(req,res,next)=>{
    if(req.user.role===0){
        return res.json('You r not Alloawed,get out now')

    }
    else{
        next()
    }
}

module.exports={admin}