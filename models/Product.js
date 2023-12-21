const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },

    img:{
        type:String,
        required:true
},
   

    category:{type: mongoose.Schema.Types.ObjectId , ref:'Category'}
})

const products = new mongoose.model("Products" , ProductSchema)
module.exports = products
