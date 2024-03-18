import mongoose from 'mongoose';
import Ordonnance from '../models/Ordonnance.js';
import Prescription from '../models/Prescription.js';
const MONGODB_URI = "mongodb://127.0.0.1:27017/vidal"; // fait belek francky, c'est pas bon ça


const ordonnanceTestData = {
    date: new Date(),
    idPatient: new mongoose.Types.ObjectId(),
    Prescription: []
};

const prescriptionTestData = {
    Medicament: '12345',
    Posologie: 'Test',
    Remarque: 'Test'
};

const addOrdonnanceToDB = async () => {
    const newOrdonnance = new Ordonnance(ordonnanceTestData);
    const newPrescription = new Prescription(prescriptionTestData);
    try {
        await newOrdonnance.save();
        await newPrescription.save();
        console.log('Ordonnance ajoutée avec succès');
    } catch (err) {
        console.error('Erreur lors de l\'ajout de l\'ordonnance:', err);
    }
};


export default addOrdonnanceToDB;
