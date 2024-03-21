import mongoose from 'mongoose';
import Ordonnance from '../models/Ordonnance.js';
import getOrdonnance  from '../controllers/OrdonnanceController.js';


/*const ordonnanceTestData = {
    date: new Date(),
    idPatient: new mongoose.Types.ObjectId(),
    Prescription: []
};



const addOrdonnanceToDB = async () => {
    const newOrdonnance = new Ordonnance(ordonnanceTestData);
    try {
        const ordonnance = await newOrdonnance.save(); // Attendre la sauvegarde de l'ordonnance
        const req = {
            params: {
                id: ordonnance.id
            }
        };
        console.log(req.params.id);
        await getOrdonnance(req, null); // Passer null pour res si vous n'en avez pas besoin
        console.log('Ordonnance ajoutée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'ordonnance:', error);
    }
};


export default addOrdonnanceToDB;*/
