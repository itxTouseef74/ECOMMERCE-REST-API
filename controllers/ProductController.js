const Product = require("../models/Product.js");
const Category = require("../models/Category.js");
const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");

exports.createCsv = async (req, res) => {
  try {
    const productData = await csv().fromFile(req.file.path);
    const categories = await Category.find();
    const categoriesMap = createCategoryMap(categories);

    const insertedProducts = [];

    for (const item of productData) {
      const categoryName = item.Category.toLowerCase();
      const categoryId = categoriesMap[categoryName];

      if (!categoryId) {
        const existingCategory = categories.find(category => category.name.toLowerCase() === categoryName);

        if (existingCategory) {
          categoriesMap[categoryName] = existingCategory._id;
        } else {
          const newCategory = await Category.create({ name: item.Category });
          categoriesMap[categoryName] = newCategory._id;
        }
      }

      const imagePath = item.Picture;

      if (imagePath && imagePath.toLowerCase().endsWith(".jpg")) {
        console.log(`Processing product: ${item.Name}`);
        console.log(`Category ID: ${categoriesMap[categoryName]}`);
        console.log(`Image Path: ${imagePath}`);

        if (fs.existsSync(imagePath)) {
          const destinationPath = path.join(__dirname, "../public/uploads/", path.basename(imagePath));
          fs.copyFileSync(imagePath, destinationPath);
        
          const insertedProduct = await createProduct(item, categoriesMap[categoryName], destinationPath);
          insertedProducts.push(insertedProduct);
          console.log({ insertedProduct, message: "Product created successfully" });
        } else {
          console.warn(`Image path does not exist for product: ${item.Name}`);
        }
      } else {
        console.warn(`Invalid image extension or path for product: ${item.Name}`);
      }
    }

    res.status(201).send({ message: "Products created successfully", insertedProducts });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

function createCategoryMap(categories) {
  const categoriesMap = {};
  categories.forEach(category => {
    categoriesMap[category.name.toLowerCase()] = category._id; 
  });
  return categoriesMap;
}

async function createProduct(item, categoryId, imagePath) {
  return await Product.create({
    name: item.Name,
    description: item.Description,
    price: item.Price,
    img: imagePath,
    category: categoryId,
  });
}

exports.createProduct = async (req, res) => {
  try {
    const { categoryId, ...productData } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(400).send({ message: "Invalid category ID" });
    }

    const createProduct = new Product({
      ...productData,
      category: categoryId,
    });

    const createdProduct = await createProduct.save();
    res
      .status(201)
      .send({ message: "Product created successfully", createdProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const getProduct = await Product.find();
    res.send({ message: "product fetched successfully", getProduct });
  } catch (error) {
    res.send({ error: error }).status();
  }
};
exports.getProductById = async (req, res) => {
  try {
    const _id = req.params.id
    const getProduct = await Product.findById(_id);
    res.send({ message: "product fetched successfully", getProduct });
  } catch (error) {
    res.send({ error: error }).status();
  }
};
exports.patchProduct = async (req , res) =>{
   try {
    const _id = req.params.id
    const patchProduct = await Product.findByIdAndUpdate(_id , req.body , {
        name:true
    })
    res.send({message:"Product updated successfully " , patchProduct}).send(200)
   } catch (error) {
    res.send({message:"SERVER ERROR" , error}).status(500)
   }
}
exports.deleteProduct = async (req, res)=>{
    try {
        const _id = req.params.id
        await Product.findByIdAndDelete(_id , req.body , {
            new:true
        })
        res.send({message:"Product deleted successfully"}).status(202)
    } catch (error) {
        res.send({message:error})
    }
}