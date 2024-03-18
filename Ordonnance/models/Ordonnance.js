import mongoose from "mongoose";

const ordonnanceSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    idDoctor: {type: mongoose.Schema.Types.ObjectId, required: true}, 
    idPatient: {type: mongoose.Schema.Types.ObjectId, required: true},
    listMedicament: [{name: String, dosage: String, duration: String, description: String}]
});

const Ordonnance = mongoose.model('Ordonnance', ordonnanceSchema);
export default Ordonnance;