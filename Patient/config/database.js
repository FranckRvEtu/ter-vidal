import mongoose from "mongoose";
import Patient from "../models/Patient.js";
import getPatient from "../controllers/PatientController.js";

/*const patientTestData = {
    name: 'Test',
    firstname: 'Test',
    birthdate: new Date(),
    sexe: 'Test',
    height: 1,
    weight: 1,
    BloodType: 'Test',
    antecedant: [],
    listIDOrdo: [],
    listIDrdv: [],
    listIDvisite: []
};

const addPatientToDB = async () => {
    const newPatient = new Patient(patientTestData);
    try {
        const patient = await newPatient.save(); // Attendre la sauvegarde du patient
        console.log('Patient ajouté avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout du patient:', error);
    }
};

export default addPatientToDB;*/
