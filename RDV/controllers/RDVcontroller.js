import RDV from '../models/RDV.js';


export const addRDV = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const { date, idPatient, lieu} = req.body;
    try {
        // Créer le RDV dans la base de données
        const newRDV = new RDV({ 
            date,
            idPatient,
            lieu 
        });

        await newRDV.save();

        res.status(201).json({ id: newRDV.id });
    } catch (error) {
        console.error(error);
    }
}

export const getRDV = async (req, res) => {
    try {
        // Recherche du RDV par son ID (remarquez que req.params.id est utilisé ici)
        const { id } = req.params;
        const rdv = await RDV.findById(id);
        
        // Si le RDV n'est pas trouvé, renvoyez un code 404
        if (!rdv) {
            return res.status(404).json({ message: "RDV pas trouvé" });
        }

        // Si le RDV est trouvé, renvoyez les données du RDV
        console.log(rdv);
        res.json(rdv);

    } catch (error) {
        console.error(error);
    }
}

export const getAllRDVs = async (req, res) => {
    try {
        const rdvs = await RDV.find({});
        res.json(rdvs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des RDVs" });
    }
};


export const updateRDV = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const rdv = await RDV.findByIdAndUpdate(id, update, { new: true });
        if (!rdv) {
            return res.status(404).json({ message: "RDV pas trouvé" });
        }
        res.json(rdv);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du RDV" });
    }
};


export const deleteRDV = async (req, res) => {
    const { id } = req.params;

    try {
        const rdv = await RDV.findByIdAndDelete(id);
        if (!rdv) {
            return res.status(404).json({ message: "RDV pas trouvé" });
        }
        res.status(204).json({ message: "RDV supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression du RDV" });
    }
};
