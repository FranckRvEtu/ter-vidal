import Prescription from "../models/Prescription";

export const getPrescription = async (req, res) => {
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

export const addPrescription = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const {  idOrdonnance, idMedicament, posologie} = req.body;
    try {
        // Créer la prescription dans la base de données
        const newPrescription = await Prescription.save({ // on utilise la méthode save car elle est plus flexible que create
            idOrdonnance,
            idMedicament,
            posologie
                });

        res.status(201).json({ id: newPrescription.id });
    } catch (error) {
        console.error(error);
    }
}

