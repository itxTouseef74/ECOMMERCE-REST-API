const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    productId:
    {type : mongoose.Schema.Types.ObjectId , ref:'Product' , required:true},
    quantity:{
        required:true,
        type:Number
    },
    price:{
        type:Number,
        required:true

    },
    address:{
        country:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        city: {
            type:String,
            required:true
        },
      },
      phone:{
        type:Number,
        required:true

      },
      date:{
        type:Date,
      },
      status:{
        type:Boolean,
        default:false
      },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Order = new mongoose.model("Order" , orderSchema)
module.exports = Order