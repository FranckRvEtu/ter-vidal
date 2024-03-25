import Visite from "../models/visiteModel";


const addVisite = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const { date, idPatient, idOrdonnce} = req.body;
    try {
        // Créer la visite dans la base de données
        const newVisite = new Visite({ // on utilise la méthode save car elle est plus flexible que create
            date,
            idPatient,
            idOrdonnce
        });

        await newVisite.save();

        res.status(201).json({ id: newVisite.id });
    } catch (error) {
        console.error(error);
    }
}

const getVisite = async (req, res) => {
    try {
        // Recherche de la visite par son ID (remarquez que req.params.id est utilisé ici)
        const { id } = req.params;
        const visite = await Visite.findById(id);
        
        // Si la visite n'est pas trouvée, renvoyez un code 404
        if (!visite) {
            return res.status(404).json({ message: "Visite pas trouvée" });
        }

        // Si la visite est trouvée, renvoyez les données de la visite
        console.log(visite);
        res.json(visite);

    } catch (error) {
        console.error(error);
    }
}



const getAllVisites = async (req, res) => {
    try {
        const visites = await Visite.find({});
        res.json(visites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des visites" });
    }
};


const updateVisite = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const visite = await Visite.findByIdAndUpdate(id, update, { new: true });
        if (!visite) {
            return res.status(404).json({ message: "Visite pas trouvée" });
        }
        res.json(visite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la visite" });
    }
};


const deleteVisite = async (req, res) => {
    const { id } = req.params;

    try {
        const visite = await Visite.findByIdAndDelete(id);
        if (!visite) {
            return res.status(404).json({ message: "Visite pas trouvée" });
        }
        res.status(204).json({ message: "Visite supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de la visite" });
    }
};

module.exports = {
    getVisite,
    addVisite,
    deleteVisite,
    updateVisite,
    getAllVisite,
    // Ajoutez les a
};
