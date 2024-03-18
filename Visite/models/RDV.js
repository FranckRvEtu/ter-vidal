import mongoose from "mongoose";

const rdvSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    idDoctor: {type: mongoose.Schema.Types.ObjectId, required: true}, 
    idPatient: {type: mongoose.Schema.Types.ObjectId, required: true},
    lieu : {type: String, required: true}
});

const RDV = mongoose.model('RDV', rdvSchema);
export default RDV;