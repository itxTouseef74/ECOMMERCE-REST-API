const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://Touseef:Touseef2252@ecommerce.alvb3k1.mongodb.net/")
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((error) => {
        console.error("Error connecting to DB:", error);
    });