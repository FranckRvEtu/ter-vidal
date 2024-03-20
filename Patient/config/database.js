import mongoose from 'mongoose';
import Patient from '../models/Patient.js'; 
import Antecedant from '../models/Antecedant.js';



const patientTestData = {
    name: 'Test',
    firstname: 'Patient',
    birthdate: new Date('1990-01-01'),
    sexe: 'Féminin',
    height: 170,
    weight: 65,
    BloodType: 'A+',
    antecedant: [],
    listIDOrdo: [],
    listIDrdv: [],
    listIDvisite: []
};

const antecedantTestData = {
    diagnostic: 'Test',
    date: new Date('2021-01-01'),
    description: 'Test'
};

const addPatientToDB = async () => {
    const newPatient = new Patient(patientTestData);
    const newAntecedant = new Antecedant(antecedantTestData);
    try {
        await newAntecedant.save();
        await newPatient.save();
        console.log('Patient ajouté avec succès');
        console.log('Antécédant ajouté avec succès');
    } catch (err) {
        console.error('Erreur lors de l\'ajout du patient:', err);
    }
};


export default addPatientToDB;
