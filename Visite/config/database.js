import mongoose  from "mongoose";
import Visite from "../models/Visite.js";


/*const visiteTestData = {
    date: new Date(),
    idPatient: new mongoose.Types.ObjectId(),
    idOrdonnance: new mongoose.Types.ObjectId()
};

const addVisiteToDB = async () => {
    const newVisite = new Visite(visiteTestData);
    try {
        const visite = await newVisite.save(); // Attendre la sauvegarde de la visite
        console.log('Visite ajoutée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la visite:', error);
    }
};

export default addVisiteToDB;*/