import Patient from "../models/patient.js";

export const getPatient = async (req, res) => {
    try {
        // Recherche du patient par son ID (remarquez que req.params.id est utilisé ici)
        console.log(req.params.id);
        const patient = await Patient.findById(req.params.id);
        
        // Si le patient n'est pas trouvé, renvoyez un code 404
        if (!patient) {
            return res.status(404).json({ message: "Patient pas trouvé" });
        }

        // Si le patient est trouvé, renvoyez les données du patient
        console.log(patient);
        res.json(patient);
    } catch (error) {
        console.error(error);
    }
}

// cette fonction verifie pas si le patient existe déjà
export const addPatient = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const { name, firstname, birthdate, sexe, height, weight, BloodType,
        antecedants,listIDOrdo,listIDrdv,listIDvisite} = req.body;
    try {
        // Créer le patient dans la base de données
        const newPatient = await Patient.save({ // on utilise la méthode save car elle est plus flexible que create
            name,
            firstname,
            birthdate,
            sexe,
            height,
            weight,
            BloodType,
            antecedants: antecedants || [],
            listIDOrdo: listIDOrdo || [],
            listIDrdv: listIDrdv || [],
            listIDvisite: listIDvisite || []
        });

        res.status(201).json({ id: newPatient.id });
    } catch (error) {
        console.error(error);
    }
}

