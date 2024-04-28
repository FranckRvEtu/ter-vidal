const Prescription = require("../models/prescriptionModel");


// Fonction pour ajouter une prescription
const addPrescription = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const { Medicament, Posologie, Remarque } = req.body;
    try {
        // Créer la prescription dans la base de données
        const newPrescription = new Prescription({
            Medicament,
            Posologie,
            Remarque
        });

        // Enregistrez la nouvelle prescription dans la base de données
        await newPrescription.save();

        // Une fois que la prescription est ajoutée avec succès, récupérez l'ID de la prescription
        const newPrescriptionId = newPrescription._id;
        console.log(newPrescriptionId);
        // Appelez la fonction getPrescription avec l'ID de la nouvelle prescription
        const prescription = await getPrescription(newPrescriptionId);

        // Affichez les données de la prescription sur la page
        res.json(prescription);

    } catch (error) {
        console.error(error);
    }
}

const addManyPrescriptions = async (req, res) => {
    const {prescriptions} = req.body;
    const newPrescriptionsId = [];
    try{
        for (prescription of prescriptions){
            const {Medicament, Posologie, Remarque} = prescription;
            const newPrescription = new Prescription({
                Medicament,
                Posologie,
                Remarque
            });
            await newPrescription.save();
            newPrescriptionsId.push(newPrescription._id);
        }
        console.log("Prescriptions ajoutées avec succès");
        res.status(201).json(newPrescriptionsId);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Erreur lors de l'ajout des prescriptions"});
    }
}

// Fonction pour récupérer une prescription par son ID
const getPrescription = async (prescriptionId) => {
    try {
        // Recherche de la prescription par son ID
        const prescription = await Prescription.findById(prescriptionId);

        // Si la prescription n'est pas trouvée, renvoyez un code 404
        if (!prescription) {
            throw new Error("Prescription not found");
        }

        // Si la prescription est trouvée, renvoyez les données de la prescription
        return prescription;

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
    addManyPrescriptions,
    deletePrescription,
    updatePrescription,
    getAllPrescriptions,
};
