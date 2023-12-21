const express  = require("express")
const router = express.Router()
const categorycontroller = require("../controllers/CategoryController.js")

router.post("/category" ,categorycontroller.createCategory)
router.get("/category" ,categorycontroller.getCategories )
router.get("/category/:id" ,categorycontroller.getCategoryById )
router.patch("/category/:id" ,categorycontroller.patchCategory )
router.delete("/category/:id" , categorycontroller.deleteCategory)
module.exports = router