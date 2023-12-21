const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
  
    
    }
})

const category = new mongoose.model("Category" , CategorySchema)
module.exports = category