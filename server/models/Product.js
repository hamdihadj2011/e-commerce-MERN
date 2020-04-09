const mongoose=require('mongoose')
const Schema=mongoose.Schema

const productSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:1,
        maxlength:100
    },
    description:{
        type:String,
        required:true,
        maxlength:100
    },
    price:{
        type:Number,
        required:true,
        maxlength:255
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:'brand',
        required:true
    },
    shipping:{
        required:true,
        type:Boolean
    },
    available:{
        required:true,
        type:Boolean
    },
    wood:{
        type:Schema.Types.ObjectId,
        ref:'wood',
        required:true
    },
    frets:{
        required:true,
        type:Number
    },
    sold:{
        type:Number,
        maxlength:100,
        default:0
    },
    publish:{
        type:Boolean,
        required:true
    },
    images:{
        type:Array,
        default:[]
    }

},{timestamps:true})

module.exports=Product=mongoose.model('product',productSchema)