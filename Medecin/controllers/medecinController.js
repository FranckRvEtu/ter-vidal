const MedecinM = require('../models/medecinModel.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();

const loginMedecin = async (req, res) => { //belec faudra créer une collection pour les medecins
    const mail = req.body.email;
    const password = req.body.password;
    console.log("je suis dans loginMedecin");
    try {
        // Recherche du Medecin par son email
        console.log("je vais fetch", mail);
        const medecin = await MedecinM.findOne({ email: mail});
        console.log("je asuis après le fetch", medecin);
        if (!medecin) {
            return res.status(404).json({ message: "Medecin pas trouvé" });
        }
        console.log("je vais bcrypt copare", password, medecin.password);
        const isMatch = await bcrypt.compare(password, medecin.password);
        if (!isMatch) {
            console.log("je suis dans password !=");
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }else{
            console.log("avant le save", medecin);
            const accessToken = jwt.sign(
                { email: medecin.email}, 
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            const refreshToken = jwt.sign(
                { email: medecin.email}, 
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            medecin.refreshToken = refreshToken; //on sauvegarde le refreshToken dans la base de données
            await medecin.save();
            console.log("après le save", medecin);
            
            //on envoie le refreshToken dans un cookie
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})
            //secure: true -> pour https

            console.log("après le save accessToken", accessToken);
            //on envoie l'accessToken dans le corps de la réponse
            res.json({ accessToken });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion du Medecin" });
    }
};

// cette fonction verifie pas si le Medecin existe déjà
const addMedecin = async (req, res) => {
    // on prend les infos de req.body et on les stock
    const { name, firstname, birthdate, email, tel, password} = req.body;
    try {
        // Créer le Medecin dans la base de données
        const newMedecin = new MedecinM({ // on utilise la méthode save car elle est plus flexible que create
            name,
            firstname,
            birthdate,
            email,
            tel,
            password,
        });

        await newMedecin.save();

        res.status(201).json({ id: newMedecin.id });
    } catch (error) {
        console.error(error);
    }
}



const getMedecin = async (req, res) => {
    try {
        // Recherche du Medecin par son ID (remarquez que req.params.id est utilisé ici)
        const { id } = req.params;
        const Medecin = await MedecinM.findById(id);
        
        // Si le Medecin n'est pas trouvé, renvoyez un code 404
        if (!Medecin) {
            return res.status(404).json({ message: "Medecin pas trouvé" });
        }

        // Si le Medecin est trouvé, renvoyez les données du Medecin
        console.log(Medecin);
        res.json(Medecin);
    } catch (error) {
        console.error(error);
    }
}


const updateMedecin = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    try {
        const Medecin = await MedecinM.findByIdAndUpdate(id, update, { new: true });
        if (!Medecin) {
            return res.status(404).json({ message: "Medecin pas trouvé" });
        }
        res.json(Medecin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du Medecin" });
    }
};


const deleteMedecin = async (req, res) => {
    const { id } = req.params;

    try {
        const Medecin = await MedecinM.findByIdAndDelete(id);
        if (!Medecin) {
            return res.status(404).json({ message: "Medecin pas trouvé" });
        }
        res.status(204).json({ message: "Medecin supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression du Medecin" });
    }
};

module.exports = {
    getMedecin,
    addMedecin,
    deleteMedecin,
    updateMedecin,
    loginMedecin,
    // Ajoutez les a
};
