import Prescription from "../models/Prescription";

const getPrescription = async (req, res) => {
    try {
        // Recherche de la prescription par son ID (remarquez que req.params.id est utilisé ici)
        console.log(req.params.id);
        const prescription = await Prescription.findById(req.params.id);
        
        // Si la prescription n'est pas trouvée, renvoyez un code 404
        if (!prescription) {
            return res.status(404).json({ message: "Prescription pas trouvée" });
        }

        // Si la prescription est trouvée, renvoyez les données de la prescription
        console.log(prescription);
        res.json(prescription);

    } catch (error) {
        console.error(error);
    }
}

export default getPrescription; // exporte la fonction getPrescription pour l'utiliser dans server.js