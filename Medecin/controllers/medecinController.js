import Medecin from "../models/medecinModel.js";



// cette fonction verifie pas si le Medecin existe déjà
export const addMedecin = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const { name, firstname, birthdate, email, tel, password} = req.body;
    try {
        // Créer le Medecin dans la base de données
        const newMedecin = new Medecin({ // on utilise la méthode save car elle est plus flexible que create
            name,
            firstname,
            birthdate,
            email,
            tel,
            password,
        });

        await newMedecin.save();

        res.status(201).json({ id: newMedecin.id });
    } catch (error) {
        console.error(error);
    }
}



export const getMedecin = async (req, res) => {
    try {
        // Recherche du Medecin par son ID (remarquez que req.params.id est utilisé ici)
        const { id } = req.params;
        const Medecin = await Medecin.findById(id);
        
        // Si le Medecin n'est pas trouvé, renvoyez un code 404
        if (!Medecin) {
            return res.status(404).json({ message: "Medecin pas trouvé" });
        }

        // Si le Medecin est trouvé, renvoyez les données du Medecin
        console.log(Medecin);
        res.json(Medecin);
    } catch (error) {
        console.error(error);
    }
}


export const updateMedecin = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const Medecin = await Medecin.findByIdAndUpdate(id, update, { new: true });
        if (!Medecin) {
            return res.status(404).json({ message: "Medecin pas trouvé" });
        }
        res.json(Medecin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du Medecin" });
    }
};


export const deleteMedecin = async (req, res) => {
    const { id } = req.params;

    try {
        const Medecin = await Medecin.findByIdAndDelete(id);
        if (!Medecin) {
            return res.status(404).json({ message: "Medecin pas trouvé" });
        }
        res.status(204).json({ message: "Medecin supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression du Medecin" });
    }
};
