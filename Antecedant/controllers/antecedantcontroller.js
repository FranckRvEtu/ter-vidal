import Antecedant from "../models/Antecedant";

export const getAntecedant = async (req, res) => {
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

export const addAntecedant = async (req, res) => {

    const { diagnostic, date, description } = req.body;
    try {
        // Créer l'antecedant dans la base de données
        const newAntecedant = await Antecedant.save({ // on utilise la méthode save car elle est plus flexible que create
            diagnostic,
            date,
            description
        });

        res.status(201).json({ id: newAntecedant.id });
    } catch (error) {
        console.error(error);
    }
}

