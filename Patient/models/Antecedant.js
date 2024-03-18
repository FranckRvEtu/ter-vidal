import mongoos from "mongoose";

const antecedantSchema = new mongoos.Schema({
    diagnostic: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true}
});