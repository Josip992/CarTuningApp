const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const importAllVehicles = require("./utils/importAllVehicles.js");
const importAllProducts = require("./utils/importAllProducts.js");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const userRoutes = require("./routes/authRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected") 
    importAllVehicles();
    importAllProducts();
  }catch(err){
   console.log(err);
  }
}

connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, ()=> console.log("Server running on port: "+ PORT));