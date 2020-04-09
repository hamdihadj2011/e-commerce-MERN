const mongoose=require('mongoose')
const Schema=mongoose.Schema

const woodSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:1,
        maxlength:100
    }
})

module.exports=Wood=mongoose.model('wood',woodSchema)