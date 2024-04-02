const mongoose=require("mongoose");

const antecedantSchema = new mongoose.Schema({
    diagnostic: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true}
});
const Antecedant = mongoose.model('antecedant', antecedantSchema);
module.exports = Antecedant;
