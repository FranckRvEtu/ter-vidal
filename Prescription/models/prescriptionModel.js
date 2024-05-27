const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema(
  {
    Medicament: String,
    Posologie: String,
    Remarques: String,
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
