import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    Medicament : {type: String, required: true},
    Posologie : {type: String, required: true},
    Remarque : {type: String, required: true}
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;
