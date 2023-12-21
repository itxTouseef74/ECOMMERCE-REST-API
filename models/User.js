const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
    type:String , 
    required:true,
    unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true

    },
    password:{
        type:String,
        require:true
    }
})

const User = mongoose.model("User" , userSchema)
module.exports = User
