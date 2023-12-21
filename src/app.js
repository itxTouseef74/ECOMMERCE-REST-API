const express = require("express")
const app = express()
const port = process.env.PORT || 3000
require("../db/database.js")
const userrouter = require("../routes/User.js")
const categoryrouter=require("../routes/category.js")
const productrouter = require("../routes/product.js")
const orderrouter=require("../routes/Order.js")
app.use(express.json())
app.use(userrouter)
app.use(categoryrouter)
app.use(productrouter)
app.use(orderrouter)

app.get("/" , (req , res) =>{
res.send("hello world")
})
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log('Generated Secret Key:', secretKey);

app.listen(port , ()=>{
    console.log(`http://localhost:${port}`)
})

