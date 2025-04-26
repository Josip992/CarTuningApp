const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get("/", async (req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
        console.log("Fetched products");
    }catch(err){
        res.status(500).json({ 
            error: err 
        });
        console.log(err)
    }
});

router.get("/compatible/:vehicleModel", async(req,res) => {
    try{
        const { vehicleModel } = req.params;
        console.log(vehicleModel);
        const compatibleProducts = await Product.aggregate([
            {
              $match: {
                $or: [
                  { compatibility: "all" },
                  { "variants.model": vehicleModel }
                ]
              }
            },
            {
              $addFields: {
                matchedVariant: {
                  $filter: {
                    input: "$variants",
                    as: "variant",
                    cond: { $eq: ["$$variant.model", vehicleModel] }
                  }
                }
              }
            },
            {
              $addFields: {
                price: {
                  $cond: {
                    if: { $eq: ["$compatibility", "all"] },
                    then: "$price",
                    else: { $arrayElemAt: ["$matchedVariant.price", 0] }
                  }
                }
              }
            },
            {
              $project: {
                name: 1,
                category: 1,
                price: 1
              }
            }
          ]);
        res.json(compatibleProducts);
    }catch(err){
        res.status(500).json({ 
            error: err 
        });
        console.log(err)
    }

});

module.exports = router;