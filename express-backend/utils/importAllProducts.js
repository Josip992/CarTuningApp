const fs = require("fs");
const Product = require("../models/Product"); 

async function importAllProducts() {
  try {
    const files = fs.readdirSync("./json/productList");
    for (const file of files) {
      if (file.endsWith(".json")) {
        const data = JSON.parse(fs.readFileSync("./json/productList/"+file, "utf8"));
        const fits = file.split("_")[0].toUpperCase();
        for (const product of data) {
          if (product.compatibility) {
            await Product.updateOne(
              { fits, name: product.name }, 
              {
                $set: {
                  fits,
                  name: product.name,
                  category: product.category,
                  compatibility: product.compatibility,
                  price: product.price
                }
              },
              { upsert: true }
            );
          } else if (product.variants) {
            await Product.updateOne(
              { fits, name: product.name },
              {
                $set: {
                  fits,
                  name: product.name,
                  category: product.category,
                  variants: product.variants
                }
              },
              { upsert: true }
            );
          }
        }
        console.log("Successfully imported " + fits + " products.");
      }
    }
  } catch (err) {
    console.error("Error importing products:", err);
  }
}

module.exports = importAllProducts;
