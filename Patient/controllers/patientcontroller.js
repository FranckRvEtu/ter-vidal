const Patient = require('../models/Patient.js');

const getPatient = async (req, res) => {
    try {
        // Recherche du patient par son ID (remarquez que req.params.id est utilisé ici)
        const patient = await Patient.findById(req.params.id);
        
        // Si le patient n'est pas trouvé, renvoyez un code 404
        if (!patient) {
            return res.status(404).json({ message: "Patient pas trouvé" });
        }

        // Si le patient est trouvé, renvoyez les données du patient
        res.json(patient);
    } catch (error) {
        console.error(error);
    }
}