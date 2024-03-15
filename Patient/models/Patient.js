import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    
    name : {type: String, required: true}, 
    firstname : {type: String, required: true},
    birthdate : {type: Date, required: true},
    sexe : {type: String, required: true},
    height : {type: Number, required: true},
    weight : {type: Number, required: true},
    BloodType : {type: String, required: true},
    medicalHistory : [{condition: String, date: Date, description: String}],
    listIDOrdo : [{ type: mongoose.Schema.Types.ObjectId}],
    listIDrdv : [{ type: mongoose.Schema.Types.ObjectId}],
    listIDvisite :[{ type: mongoose.Schema.Types.ObjectId}]
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;