import mongoose from 'mongoose';
import Ordonnance from '../models/Ordonnance.js';
import Prescription from '../models/Prescription.js';
import  getOrdonnance  from '../controllers/OrdonnanceController.js';
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
        const ordonnance = await newOrdonnance.save(); // Attendre la sauvegarde de l'ordonnance
        const req = {
            params: {
                id: ordonnance.id
            }
        };
        console.log(req.params.id);
        await getOrdonnance(req, null); // Passer null pour res si vous n'en avez pas besoin
        await newPrescription.save(); // Attendre la sauvegarde de la prescription
        console.log('Ordonnance ajoutée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'ordonnance:', error);
    }
};


export default addOrdonnanceToDB;
