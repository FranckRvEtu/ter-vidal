import mongoose  from "mongoose";
import Antecedant from "../models/Antecedant.js";


const antecedantTestData = {
    diagnostic: 'Test',
    date: new Date(),
    description: 'Test'
}; 

const addAntecedantToDB = async () => {
    const newAntecedant = new Antecedant(antecedantTestData);
    try {
        const antecedant = await newAntecedant.save(); // Attendre la sauvegarde de l'antécédant
        console.log('Antécédant ajouté avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'antécédant:', error);
    }
};

export default addAntecedantToDB;