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

export const addVisite = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const { date, idPatient, idOrdonnce} = req.body;
    try {
        // Créer la visite dans la base de données
        const newVisite = new Visite({ // on utilise la méthode save car elle est plus flexible que create
            date,
            idPatient,
            idOrdonnce
        });

        await newVisite.save();

        res.status(201).json({ id: newVisite.id });
    } catch (error) {
        console.error(error);
    }
}