const MedecinM = require('../models/medecinModel.js');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const refreshMedecin =  async (req, res) => { //belec faudra créer une collection pour les medecins
    const cookie = req.cookies;

    if (!cookie?.jwt) {
        return res.sendStatus(401).json({ message: "Pas de token" });
    }
    console.log("Cookie jwt présent", cookie.jwt);
    const refreshToken = cookie.jwt;
    console.log("refreshToken", refreshToken);
    try {
        // Recherche du Medecin par son email
        const medecin = await MedecinM.findOne({ refreshToken: refreshToken});
        console.log("je suis après le fetch", medecin);
        if (!medecin) {
            return res.sendStatus(403).json({ message: "Medecin pas trouvé" });
        }
        jwt.verify(refreshToken, 
            process.env.REFRESH_TOKEN_SECRET, 
            (err, decoded) => {
                if (err) {
                    return res.sendStatus(403).json({ message: "Pas de token" }); //invalid token
                    //403 = forbiden access
                }else{
                    const accessToken = jwt.sign(
                        { email: decoded.email, id: decoded._id }, 
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '30s' }
                    );
                    res.json({ accessToken });
                }
            }
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la connexion du Medecin" });
    }
};

module.exports = {
    refreshMedecin,
    // Ajoutez les a
};
