const fs = require("fs");
const Product = require("../models/Product"); 

function generateSKU(product, variantModel = null) {
  const slugify = (str) =>
    str
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '-') 
      .replace(/(^-|-$)/g, '');

  const shortName = product.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase(); 

  const categoryCode = slugify(product.category).slice(0, 5); 

  if (variantModel) {
    const modelCode = variantModel.split(' ')[0].toUpperCase();
    return `${categoryCode}-${shortName}-${modelCode}`;
  } else {
    return `${categoryCode}-${shortName}`;
  }
}


async function importAllProducts() {
  try {
    const files = fs.readdirSync("./json/productList");
    for (const file of files) {
      if (file.endsWith(".json")) {
        const data = JSON.parse(fs.readFileSync("./json/productList/"+file, "utf8"));
        const fits = file.split("_")[0].toUpperCase();
        const uniqueData = data.filter(
          (product, index, self) =>
            index === self.findIndex(p => p.name === product.name)
        );
        for (const product of uniqueData) {
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
                  sku: generateSKU(product),
                  stock: product.stock,
                  createdAt: new Date()
                }
              },
              { upsert: true }
            );
          } else if (product.variants) {
            product.variants = product.variants.filter(
              (variant, index, self) =>
                index === self.findIndex(v => v.model === variant.model)
            );
            console.log(product.variants);
            await Product.updateOne(
              { fits, name: product.name },
              {
                $set: {
                  fits,
                  name: product.name,
                  category: product.category,
                  variants: product.variants.map((variant)=>({
                    model: variant.model,
                    price: variant.price,
                    sku: generateSKU(product, variant.model),
                    stock: variant.stock
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
