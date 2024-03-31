const mongoose = require("mongoose");

const rdvSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    idPatient: {type: mongoose.Schema.Types.ObjectId, required: true},
    lieu : {type: String, required: true}
});

const RDV = mongoose.model('RDV', rdvSchema);
module.exports = RDV;