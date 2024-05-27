const Antecedant= require("../models/antecedantModel.js");

const Patient = require('../models/patientModel'); // Assurez-vous d'importer le modèle Patient

const addAntecedant = async (req, res) => {
    const { diagnostic, date, description , patientId } = req.body;
    try {
        // Créer un nouvel objet antécédant
        const nouvelAntecedant = new Antecedant({
            diagnostic: diagnostic,
            date: date,
            description: description
        });

        // Enregistrer l'antécédant et récupérer l'objet sauvegardé
        const savedAntecedant = await nouvelAntecedant.save();

        // Rechercher le patient par son ID
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Ajouter l'ID de l'antécédant au tableau des antécédants du patient
        await patient.antecedant.push(savedAntecedant._id);

        // Sauvegarder les modifications du patient
        await patient.save();
        
        res.status(201).json({ message: "Antecedant added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}




const getAntecedant = async (req, res) => {
    try {
        // Recherche de l'antecedant par son ID (remarquez que req.params.id est utilisé ici)
        const { id } = req.params;
        const antecedant = await Antecedant.findById(id);
        
        // Si l'antecedant n'est pas trouvé, renvoyez un code 404
        if (!antecedant) {
            return res.status(404).json({ message: "Antecedant pas trouvé" });
        }

        // Si l'antecedant est trouvé, renvoyez les données de l'antecedant
        console.log(antecedant);
        res.json(antecedant);

    } catch (error) {
        console.error(error);
    }
}


const getAllAntecedant = async (req, res) => {
    try {
        const antecedants = await Antecedant.find({});
        res.json(antecedants);
    } catch (error) {
        console.error(error);
    }
}

const updateAntecedant = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const antecedant = await Antecedant.findByIdAndUpdate(id, update, { new: true });
        if (!antecedant) {
            return res.status(404).json({ message: "Antecedant pas trouvé" });
        }
        res.json(antecedant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'antecedant" });
    }
};


const deleteAntecedant = async (req, res) => {
    const { id } = req.params;

    try {
        const antecedant = await Antecedant.findByIdAndDelete(id);
        if (!antecedant) {
            return res.status(404).json({ message: "Antecedant pas trouvé" });
        }
        res.status(204).json({ message: "Antecedant supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'antecedant" });
    }
};

module.exports = {
    getAntecedant,
    addAntecedant,
    deleteAntecedant,
    updateAntecedant,
    getAllAntecedant,
    // Ajoutez les a
};
