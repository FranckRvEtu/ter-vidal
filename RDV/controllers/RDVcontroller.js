import RDV from '../models/RDV.js';

const getRDV = async (req, res) => {
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

export default getRDV; // exporte la fonction getRDV pour l'utiliser dans server.js