import Visite from "../models/Visite";

const getVisite = async (req, res) => {
    try {
        // Recherche de la visite par son ID (remarquez que req.params.id est utilisé ici)
        console.log(req.params.id);
        const visite = await Visite.findById(req.params.id);
        
        // Si la visite n'est pas trouvée, renvoyez un code 404
        if (!visite) {
            return res.status(404).json({ message: "Visite pas trouvée" });
        }

        // Si la visite est trouvée, renvoyez les données de la visite
        console.log(visite);
        res.json(visite);

    } catch (error) {
        console.error(error);
    }
}

export default getVisite; // exporte la fonction getVisite pour l'utiliser dans server.js
