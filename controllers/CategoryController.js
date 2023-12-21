const Category = require("../models/Category");
// Make sure to import your Category model

exports.createCategory = async (req, res) => {
    try {
         const category = new Category(req.body);
        await category.save();
        res.status(200).send({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};



exports.getCategories = async (req, res) => {
    try {
    
        const categories = await Category.find();
        res.status(200).send({ message: "List of Categories", categories });
    } catch (error) {
        res.status(500).send({ message: "There is an error in server fetch, please try later" , error });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const _id = req.params.id
        const categories = await Category.findById(_id);
        res.status(200).send({ message: "List of Categories", categories });
    } catch (error) {
        res.status(500).send({ message: "There is an error in server fetch, please try later" , error });
    }
};

exports.patchCategory = async (req , res)=>{
    try {
        const _id = req.params.id
        const category = await Category.findByIdAndUpdate(_id , req.body , {
            new:true
        })
        res.send({message:"Category Updated Successfully " , category})
    } catch (error) {
        res.send({message:"SEVER ERROR" , error}).status(501)
    }
}

exports.deleteCategory = async (req ,res) => {
   try {
    const _id  = req.params.id
    const category = await Category.findByIdAndDelete(_id , req.body , {
        new :true
    })
    res.send({message:"category deleted successfully " , category}).status(202)
   } catch (error) {
    res.send({message:"Server error" , error}).status(500)
   }
}