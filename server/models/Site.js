const mongoose=require('mongoose')

const SiteSchema=mongoose.Schema({
    feature:{
        required:true,
        type:Array,
        default:[]
    },
    siteInfo:{
        required:true,
        type:Array,
        default:[]
    }

})

const Site=mongoose.model('Site',SiteSchema)

module.exports={Site}