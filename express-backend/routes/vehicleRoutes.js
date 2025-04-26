const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

router.get("/", async (req,res) => {
    try{
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
        console.log("Fetched vehicles");
    }catch(err){
        res.status(500).json({
            error: err
        });
        console.log(err);
    }
});

router.get("/makes", async (req,res) => {
    try{
        const makes = await Vehicle.distinct("make");
        res.status(200).json(makes);
        console.log("Fetched makes");
    }catch(err){
        res.status(500).json({
            error: err
        });
        console.log(err);
    }

});

router.get("/models", async(req,res) => {
    const {make} = req.query;
    if(!make){
        return res.status(400);
    };
    try{
        const models = await Vehicle.find({make}).distinct("vehicleModel");
        res.json(models);
    }catch(err){
        res.status(500).json({
            error: err
        });
        console.log(err);
    }
});

router.get("/types", async(req, res) => {
    const {vehicleModel} = req.query;
    try{
        const types = await Vehicle.find({vehicleModel}).distinct("vehicleType");
        res.json(types);
    }catch(err){
        res.status(500).json({
            error: err
        });
        console.log(err);
    }
});

router.get("/engines", async(req, res) => {
    const {vehicleType} = req.query;
    try{
        const engines = await Vehicle.find({vehicleType}).distinct("engine");
        res.json(engines);
    }catch(err){
        res.status(500).json({
            error: err
        });
        console.log(err);  
    }
});

module.exports = router;