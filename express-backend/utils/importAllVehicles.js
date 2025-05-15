const fs = require("fs");
const Vehicle = require("../models/Vehicle"); 

async function importAllVehicles() {
  try {
    const files = fs.readdirSync("./json/vehicleList");
    for (const file of files) {
      if (file.endsWith(".json")) {
        const data = JSON.parse(fs.readFileSync("./json/vehicleList/"+file, "utf8"));

        const make = file.split("_")[0].toUpperCase();

        for (const vehicleModel in data) {
          const vehicleModels = data[vehicleModel];
          for (const vehicleType in vehicleModels) {
            const engine = vehicleModels[vehicleType];
            await Vehicle.updateOne(
                        {make, vehicleModel, vehicleType},
                        {
                          $set: {
                            make,
                            vehicleModel,
                            vehicleType,
                          },
                            $addToSet: {
                              engine: {$each: vehicleModels[vehicleType]}
                            }
                        },
                          {upsert: true}
                      );
                    }
                  }    

        console.log("Successfully imported " + make + " vehicles.");
      }
    }
  } catch (err) {
    console.error("Error importing vehicles:", err);
  }
}

module.exports = importAllVehicles;
