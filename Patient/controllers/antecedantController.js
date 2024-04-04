const Antecedant= require("../models/antecedantModel.js");

const addAntecedant = async (req, res) => {

    const { diagnostic, date, description } = req.body;
    try {
        // Créer l'antecedant dans la base de données
        const newAntecedant = new Antecedant({ 
            diagnostic,
            date,
            description
        });

        await newAntecedant.save();

        res.status(201).json({ id: newAntecedant.id });
    } catch (error) {
        console.error(error);
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
