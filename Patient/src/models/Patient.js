const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    IdP : {type: String, required: true , unique: true},
    name : {type: String, required: true}, 
    firstname : {type: String, required: true},
    birthdate : {type: Date, required: true},
    sexe : {type: String, required: true},
    height : {type: Number, required: true},
    weight : {type: Number, required: true},
    BloodType : {type: String, required: true},
    medicalHistory : [{condition: String, date: Date, description: String}],
    listIDOrdo : [{type: String}],
    listIDrdv : [{type: String}],
    listIDvisite : [{type: String}]
});

module.exports = mongoose.model('Patient', patientSchema);