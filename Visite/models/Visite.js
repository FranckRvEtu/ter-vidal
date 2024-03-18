import mongoose from "mongoose";

const visiteSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    idDoctor: {type: mongoose.Schema.Types.ObjectId, required: true}, 
    idPatient: {type: mongoose.Schema.Types.ObjectId, required: true},
    idOrdonnance: {type: mongoose.Schema.Types.ObjectId, required: true}
});

const Visite = mongoose.model('Visite', visiteSchema);
export default Visite;