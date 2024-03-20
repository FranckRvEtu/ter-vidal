import mongoose from "mongoose";

const antecedantSchema = new mongoose.Schema({
    diagnostic: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true}
});

const Antecedant = mongoose.model('Antecedant', antecedantSchema);
export default Antecedant;


