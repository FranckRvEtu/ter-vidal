import mongoose from 'mongoose';
import antecedantSchema from './antecedantModel.js';

const MedecinSchema = new mongoose.Schema({
    name : {type: String, required: true}, 
    firstname : {type: String, required: true},
    email : {type: Date, required: true},
    tel : {type: String, required: true},
    password : {type: Number, required: true},
});

const Medecin = mongoose.model('Medecin', MedecinSchema);
export default Medecin;