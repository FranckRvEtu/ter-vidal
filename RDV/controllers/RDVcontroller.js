import RDV from '../models/RDV.js';

export const getRDV = async (req, res) => {
    try {
        // Recherche du RDV par son ID (remarquez que req.params.id est utilisé ici)
        console.log(req.params.id);
        const rdv = await RDV.findById(req.params.id);
        
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

