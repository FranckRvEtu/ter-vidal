
import Ordonnance from '../models/Ordonnance.js'; // Ajustez le chemin selon votre structure de projet

const getOrdonnance = async (req, res) => {
    try {
        // Recherche du patient par son ID (remarquez que req.params.id est utilisé ici)
        console.log(req.params.id);
        const ordonnance = await Ordonnance.findById(req.params.id);
        
        // Si le patient n'est pas trouvé, renvoyez un code 404
        if (!ordonnance) {
            return res.status(404).json({ message: "Or pas trouvé" });
        }

        // Si le patient est trouvé, console.log l'ordonnance 
        console.log(ordonnance);
    } catch (error) {
        console.error(error);
    }
}

export default getOrdonnance; // exporte la fonction getOrdonnance pour l'utiliser dans server.js
