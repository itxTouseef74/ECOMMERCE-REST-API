const express = require("express");
const product = express()
const router = express.Router();
const ProductController = require("../controllers/ProductController.js");
const multer = require("multer")
const path = require("path")
const bodyparser = require("body-parser")

product.use(bodyparser.urlencoded({extended:true}));
product.use(express.static(path.resolve(__dirname , 'public')))


const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
       cb(null, './public/uploads/')  
    },
    filename:(req , file , cb )=>{
    cb(null , file.originalname)
    }
})


const uploads = multer({storage:storage})



router.post("/product",uploads.single('file'),  ProductController.createProduct);
router.post("/csv" , uploads.single('file'), ProductController.createCsv)
router.get("/product", ProductController.getProduct);
router.get("/product/:id", ProductController.getProductById);
router.patch("/product/:id" , ProductController.patchProduct)
router.delete("/product/:id" , ProductController.deleteProduct)
module.exports = router;




