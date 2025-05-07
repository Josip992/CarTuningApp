const fs = require("fs");
const Product = require("../models/Product"); 

function generateSku(product) {
  const namePart = product.name.replace(/\s+/g, '-').toUpperCase().slice(0, 10);
  const timestamp = Date.now().toString().slice(-6); 
  return `${namePart}-${timestamp}`;
}

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
                  price: product.price,
                  sku: generateSku(product),
                  stock: product.stock,
                  createdAt: new Date()
                }
              },
              { upsert: true }
            );
          } else if (product.variants) {
            
            console.log(product.variants);
            await Product.updateOne(
              { fits, name: product.name },
              {
                $set: {
                  fits,
                  name: product.name,
                  category: product.category,
                  variants: product.variants.map((variant)=>({
                    ...variant,
                    sku: generateSku(product),
                    stock: product.stock
                  })),
                  createdAt: new Date()
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
