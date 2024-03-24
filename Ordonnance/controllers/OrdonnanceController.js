import Ordonnance from '../models/Ordonnance.js'; // Ajustez le chemin selon votre structure de projet


export const addOrdonnance = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const { date, idPatient, Prescription} = req.body;
    try {
        // Créer l'ordonnance dans la base de données
        const newOrdonnance = new Ordonnance({ // on utilise la méthode save car elle est plus flexible que create
            date,
            idPatient,
            Prescription: Prescription || []
        });

        await newOrdonnance.save();

        res.status(201).json({ id: newOrdonnance.id });
    } catch (error) {
        console.error(error);
    }
}

export const getOrdonnance = async (req, res) => {
    try {
        // Recherche du patient par son ID (remarquez que req.params.id est utilisé ici)
        console.log(req.params.id);
        const ordonnance = await Ordonnance.findById(req.params.id);
        
        // Si le patient n'est pas trouvé, renvoyez un code 404
        if (!ordonnance) {
            return res.status(404).json({ message: "Or pas trouvé" });
        }

        // Si le patient est trouvé, console.log l'ordonnance 
        console.log(ordonnance);
        res.json(ordonnance);

    } catch (error) {
        console.error(error);
    }
}



export const getAllOrdonnances = async (req, res) => {
    try {
        const ordonnances = await Ordonnance.find({});
        res.json(ordonnances);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des ordonnances" });
    }
};


export const updateOrdonnance = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const ordonnance = await Ordonnance.findByIdAndUpdate(id, update, { new: true });
        if (!ordonnance) {
            return res.status(404).json({ message: "Ordonnance pas trouvé" });
        }
        res.json(ordonnance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'ordonnance" });
    }
};


export const deleteOrdonnance = async (req, res) => {
    const { id } = req.params;

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
