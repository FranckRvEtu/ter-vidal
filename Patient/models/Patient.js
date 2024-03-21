import mongoose from 'mongoose';
import antecedantSchema from './Antecedant.js';

const patientSchema = new mongoose.Schema({
    name : {type: String, required: true}, 
    firstname : {type: String, required: true},
    birthdate : {type: Date, required: true},
    sexe : {type: String, required: true},
    height : {type: Number, required: true},
    weight : {type: Number, required: true},
    BloodType : {type: String, required: true},
    
    antecedant: [antecedantSchema],
    listIDOrdo : [{ type: mongoose.Schema.Types.ObjectId, ref : 'Ordonnance'}],
    listIDrdv : [{ type: mongoose.Schema.Types.ObjectId, ref : 'RendezVous'}],
    listIDvisite :[{ type: mongoose.Schema.Types.ObjectId, ref : 'Visite'}],
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;