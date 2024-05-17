const MedecinM = require('../models/medecinModel.js');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const refreshMedecin =  async (req, res) => { //belec faudra créer une collection pour les medecins
    const cookie = req.cookies;
    console.log("Cookie", cookie);

    if (!cookie?.jwt) {
        return res.status(401).json({ message: "Pas de token (controller refresh)" });
    }
    console.log("Cookie jwt présent", cookie.jwt);
    const refreshToken = cookie.jwt;
    console.log("refreshToken", refreshToken);
    try {
        // Recherche du Medecin par son email
        const medecin = await MedecinM.findOne( { refreshToken: refreshToken});
        console.log("je suis après le fetch (refreshc)", medecin);
        if (!medecin) {
            return res.status(403).json({ message: "Medecin pas trouvé" });
        }
        jwt.verify(refreshToken, 
            process.env.REFRESH_TOKEN_SECRET, 
            (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: "Pas de token" }); //invalid token
                    //403 = forbiden access
                }else{
                    const accessToken = jwt.sign(
                        { email: decoded.email}, 
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '10s' }
                    );
                    console.log("new accessToken (controller)", accessToken);
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
