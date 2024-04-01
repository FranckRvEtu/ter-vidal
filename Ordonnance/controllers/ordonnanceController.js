const Ordonnance = require('../models/ordonnanceModel.js'); // Ajustez le chemin selon votre structure de projet
const express = require('express');
const app = express();
app.use(express.json());

 const addOrdonnance = async (req, res) => {
    // on prend les infos de req.body et on les stock
    console.log("Fonction lancée");
    const { date, idPatient, Prescription} = req.body;
    try {
        // Créer l'ordonnance dans la base de données
        const newOrdonnance = new Ordonnance({ // on utilise la méthode save car elle est plus flexible que create
            date,
            idPatient,
            Prescription: Prescription || []
        });

        await newOrdonnance.save();
        console.log(newOrdonnance.id);
        res.status(201).json({ id: newOrdonnance.id });
    } catch (error) {
        console.error(error);
    }
}

  const getOrdonnance = async (req, res) => {
    try {
        // Recherche du patient par son ID (remarquez que req.params.id est utilisé ici)
        const { id } = req.params;
        const ordonnance = await Ordonnance.findById(id);
        
        // Si le patient n'est pas trouvé, renvoyez un code 404
        if (!ordonnance) {
            console.log("error");
        }

        // Si le patient est trouvé, console.log l'ordonnance 
        console.log(ordonnance);
        res.status(201).json(ordonnance);

    } catch (error) {
        console.error(error);
    }
}



 const getAllOrdonnances = async (req, res) => {
    try {
        const ordonnances = await Ordonnance.find({});
        res.json(ordonnances);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des ordonnances" });
    }
};


 const updateOrdonnance = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const ordonnance = await Ordonnance.findByIdAndUpdate(id, update, { new: true });
        if (!ordonnance) {
            console.log("Ordonnance pas trouvé");
        }
    } catch (error) {
        console.error(error);
    }
};


 const deleteOrdonnance = async (req, res) => {
    const {id} = req.params;

    try {
        const ordonnance = await Ordonnance.findByIdAndDelete(id);
        if (!ordonnance) {
            return res.status(404).json({ message: "Ordonnance pas trouvé" });
        }
        res.status(204).json({ message: "Ordonnance supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'ordonnance" });
    }
};

module.exports = {
    getOrdonnance,
    addOrdonnance,
    deleteOrdonnance,
    getAllOrdonnances,
    updateOrdonnance,
    // Ajoutez les a
};

