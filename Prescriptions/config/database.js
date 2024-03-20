import mongoose from 'mongoose';
import Prescription from '../models/Prescription.js';




const prescriptionTestData = {
    Medicament: '12345',
    Posologie: 'Test',
    Remarque: 'Test'
};

const addPrescriptionToDB = async () => {
    const newPrescription = new Prescription(prescriptionTestData);
    try {
        await newPrescription.save(); // Attendre la sauvegarde de la prescription
        console.log('Prescription ajoutée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'ordonnance:', error);
    }
};


export default addPrescriptionToDB;
