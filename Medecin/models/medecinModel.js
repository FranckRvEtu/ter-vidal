const mongoose = require('mongoose');

const medecinSchema = new mongoose.Schema({
    nom : {type: String, required: true}, 
    prenom : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    tel : {type: String, required: true, unique: true},
    password : {type: String, required: true, unique: true},
    refreshToken : {type: String},

});

const MedecinM = mongoose.model('medecin', medecinSchema);
module.exports = MedecinM;    