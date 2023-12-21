const express = require ("express")
const router = express.Router()
const orderController = require("../controllers/OrderController.js")
const authMiddleware = require("../middleware/authmiddleware.js")

router.post("/order" , authMiddleware , orderController.createOrder )
router.get("/order" , authMiddleware , orderController.getOrder )
router.get("/order/:id" , authMiddleware , orderController.getOrderById )
router.patch("/order/:id" , authMiddleware , orderController.patchOrder )
router.delete("/order/:id" , authMiddleware , orderController.deleteOrder )

module.exports=router