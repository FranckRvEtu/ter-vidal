import Prescription from "../models/prescriptionModel";


const addPrescription = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const {  idOrdonnance, idMedicament, posologie} = req.body;
    try {
        // Créer la prescription dans la base de données
        const newPrescription = new Prescription({ 
            idOrdonnance,
            idMedicament,
            posologie
        });

        await newPrescription.save();

        res.status(201).json({ id: newPrescription.id });
    } catch (error) {
        console.error(error);
    }
}



const getPrescription = async (req, res) => {
    try {
        // Recherche de la prescription par son ID (remarquez que req.params.id est utilisé ici)
        const { id } = req.params;
        const prescription = await Prescription.findById(id);
        
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


const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({});
        res.json(prescriptions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des prescriptions" });
    }
};

const updatePrescription = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const prescription = await Prescription.findByIdAndUpdate(id, update, { new: true });
        if (!prescription) {
            return res.status(404).json({ message: "Prescription pas trouvée" });
        }
        res.json(prescription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la prescription" });
    }
};

const deletePrescription = async (req, res) => {
    const { id } = req.params;

    try {
        const prescription = await Prescription.findByIdAndDelete(id);
        if (!prescription) {
            return res.status(404).json({ message: "Prescription pas trouvée" });
        }
        res.status(204).json({ message: "Prescription supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de la prescription" });
    }
};

module.exports = {
    getPrescription,
    addPrescription,
    deletePrescription,
    updatePrescription,
    getAllPrescription,
    // Ajoutez les a
};
