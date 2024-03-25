const mongoose = require("mongoose");

const ordonnanceSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    idPatient: {type: mongoose.Schema.Types.ObjectId, required: true},
    Prescription : [{ type: mongoose.Schema.Types.ObjectId, ref : 'Prescription'}]
});

const Ordonnance = mongoose.model('Ordonnance', ordonnanceSchema);
module.exports = Ordonnance;
