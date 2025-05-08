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
    console.log("variantModel: " + variantModel);
    const modelCode = variantModel.split(' ')[0].toUpperCase();
    console.log("sku: " + categoryCode + shortName + modelCode);

    return `${categoryCode}-${shortName}-${modelCode}`;
  } else {
    console.log("sku: " + categoryCode + shortName);
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
                  sku: generateSKU(product),
                  stock: product.stock,
                  createdAt: new Date()
                }
              },
              { upsert: true }
            );
          } else if (product.variants) {
            const sku = generateSKU(product, );
            //console.log(product.variants);
            await Product.updateOne(
              { fits, name: product.name },
              {
                $set: {
                  fits,
                  name: product.name,
                  category: product.category,
                  variants: product.variants.map((variant)=>({
                    ...variant,
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
