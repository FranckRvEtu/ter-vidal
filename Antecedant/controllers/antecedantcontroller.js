import Antecedant from "../models/Antecedant";

const getAntecedant = async (req, res) => {
    try {
        // Recherche de l'antecedant par son ID (remarquez que req.params.id est utilisé ici)
        console.log(req.params.id);
        const antecedant = await Antecedant.findById(req.params.id);
        
        // Si l'antecedant n'est pas trouvé, renvoyez un code 404
        if (!antecedant) {
            return res.status(404).json({ message: "Antecedant pas trouvé" });
        }

        // Si l'antecedant est trouvé, renvoyez les données de l'antecedant
        console.log(antecedant);
        res.json(antecedant);

    } catch (error) {
        console.error(error);
    }
}

export default getAntecedant; // exporte la fonction getAntecedant pour l'utiliser dans server.js
