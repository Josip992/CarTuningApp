const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const importAllVehicles = require("./utils/importAllVehicles.js");
const importAllProducts = require("./utils/importAllProducts.js");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const authRoutes = require("./routes/authRoutes.js");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/auth", authRoutes);

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