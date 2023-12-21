const Order = require("../models/Order.js");
const { findByIdAndDelete } = require("../models/User.js");

exports.createOrder = async(req , res)=>{
    try {
        const {userId} = req;
        if(!userId){
            res.send({message:"plz provide token"}).status(401)
        }
        const orderData = {...req.body ,userId ,}
        const createOrder = new Order(orderData)
        await createOrder.save()
        res.status(201).send({message:"Congratulations order created successfully" , createOrder})
    } catch (error) {
        res.send({mesage:"Error creating Order" , error}).status(500)
    }
}

exports.getOrder = async (req , res)=>{
    try {
        const {userId} = req;
        const requestedUserId = req.params.userId
        if(requestedUserId && requestedUserId !==userId){
            res.send({message:"Forbidden - You dont have permission to view this order"}).status(401)
        }
       const targetUserId = requestedUserId || userId
       const orders = await Order.find({userId:targetUserId});

        res.send({message:"order fetched successfully" , orders})
    } catch (error) {
        res.send({message:"there is error in fetching oder" , error})
    }}
exports.getOrderById = async (req , res)=>{
    try {
        const {userId} = req;
        const requestedUserId = req.params.userId
        if(requestedUserId && requestedUserId !==userId){
            res.send({message:"Forbidden - You dont have permission to view this order"}).status(401)
        }
       const _id = req.params.id
       const targetUserId = requestedUserId || userId
       const orders = await Order.findOne({_id ,userId:targetUserId});

        res.send({message:"order fetched successfully" , orders})
    } catch (error) { 
        res.send({message:"there is error in fetching oder" , error})
    }}

exports.patchOrder = async (req , res) =>{
    try {
        const {userId} = req;
        const requestedUserId = req.params.userId
        if(requestedUserId && requestedUserId !==userId){
            res.send({message:"Forbidden - You dont have permission to view this order"}).status(401)
        }
        const targetUserId = requestedUserId || userId
        const _id = req.params.id
        const orders = await Order.findByIdAndUpdate( _id , req.body ,{new:true},{userId:targetUserId}
            )
        res.send({message:"updated successfully" , orders})
    } catch (error) {

        res.send({message:"there is error in updating oder" , error})
    }
}

exports.deleteOrder = async (req ,res) =>{
try {
    const {userId} = req;
if (!userId){
    req.send({message:"Unauthorised delete request"})
}
    const _id = req.params.id 
    await Order.findByIdAndDelete(_id , req.body)
res.send({message:"order deleted successfully"}).status(200)
} catch (error) {
    res.send({message:"Server error in deleting the order"}).status(500)
}


}
