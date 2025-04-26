const mongoose = require("mongoose");


const VehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  vehicleModel: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true 
  },
  engine: {
    type: [String],
    required: true 
  }
},{
    timestamps: true
});

VehicleSchema.index({make: 1, vehicleModel: 1, vehicleType: 1}, {unique: true})

module.exports = mongoose.model("Vehicle", VehicleSchema);