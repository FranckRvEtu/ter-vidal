const mongoose = require('mongoose');
const visiteSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    idPatient: {type: mongoose.Schema.Types.ObjectId, required: true},
    idOrdonnance: {type: mongoose.Schema.Types.ObjectId, required: true}
});

const Visite = mongoose.model('Visite', visiteSchema);
module.exports = Visite;