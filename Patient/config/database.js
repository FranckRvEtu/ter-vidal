import mongoose from 'mongoose';
//import Patient from '../models/Patient.js'; 




/*const patientTestData = {
    IdP: '12345',
    name: 'Test',
    firstname: 'Patient',
    birthdate: new Date('1990-01-01'),
    sexe: 'Féminin',
    height: 170,
    weight: 65,
    BloodType: 'A+',
    medicalHistory: [{
        condition: 'Aucune condition',
        date: new Date(),
        description: 'Rien à signaler'
    }],
    listIDOrdo: [],
    listIDrdv: [],
    listIDvisite: []
};


const addPatientToDB = async () => {
    const newPatient = new Patient(patientTestData);
    try {
        const savedPatient = await newPatient.save();
        console.log('Patient ajouté avec succès:', savedPatient);
    } catch (err) {
        console.error('Erreur lors de l\'ajout du patient:', err);
    }
};
*/



export default connectDB;