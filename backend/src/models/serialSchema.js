const mongoose = require("mongoose");

const serialNumberSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "donor_serial_number"
  },
  value: {
    type: Number,
    default: 1
  }
});

const SerialNumber = mongoose.model("SerialNumber", serialNumberSchema);

module.exports = SerialNumber;