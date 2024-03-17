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

// cette fonction verifie pas si le patient existe déjà
const addPatient = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const { name, firstname, birthdate, sexe, height, weight, BloodType, medicalHistory } = req.body;
    try {
        // Créer le patient dans la base de données
        const newPatient = await Patient.create({
            name,
            firstname,
            birthdate,
            sexe,
            height,
            weight,
            BloodType,
            medicalHistory,
            // je sais pas comment initialiser les listIDOrdo, listIDrdv et listIDvisite
        });

        res.status(201).json({ id: newPatient.id });
    } catch (error) {
        console.error(error);
    }
};