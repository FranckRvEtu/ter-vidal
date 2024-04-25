const MedecinM = require('../models/medecinModel.js');
const jwt = require("jsonwebtoken");

const logoutMedecin =  async (req, res) => { //belec faudra créer une collection pour les medecins
    //on client also delete the access token!
    
    const cookie = req.cookies;

    if (!cookie?.jwt) {
        return res.sendStatus(204).json({ message: "Pas de token" });
        //204 = no content 
    }   

    //si le refresh token est présent on le supprime:
    console.log("Cookie jwt présent", cookie.jwt);
    const refreshToken = cookie.jwt;
    console.log("refreshToken", refreshToken);
    try {
        // Recherche du Medecin par son token
        const medecin = await MedecinM.findOne({ refreshToken: refreshToken});
        console.log("je suis après le fetch", medecin);
        if (!medecin) {
            res.clearCookie('jwt', {httpOnly: true});
            return res.sendStatus(204).json({ message: "Cookie cleared" });
        }    

        //si le medecin à bien un token on le supprime:
        medecin.refreshToken = "";
        await medecin.save();
        res.clearCookie('jwt', {httpOnly: true});
        res.sendStatus(204).json({ message: "Cookie cleared" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion du Medecin" });
    }
};

module.exports = {
    logoutMedecin,
};
