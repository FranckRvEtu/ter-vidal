import mongoose from 'mongoose';
//import Patient from '../models/Patient.js'; 

const MONGODB_URI = "mongodb+srv://franckreveille:dBcp0SCvEnXYb5kA@vidal.yti6o8s.mongodb.net/?retryWrites=true&w=majority&appName=vidal"; // fait belek francky, c'est pas bon ça



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
const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected...');
         // await addPatientToDB(); // pour tester la connexion, à retirer par la suite

    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};


export default connectDB;
