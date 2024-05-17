const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const verifyJWT = (req, res, next) => {
    //on récupère l'objet authorization dans le header de la requête
    const authHeader = req.headers['authorization']; 
    console.log("headers", req.headers);
    if (!authHeader) { //si l'objet authorization n'existe pas
        console.log("req.headers:", req.headers['authorization']);
        res.status(401).json({ message: "Middleware Pas de token"}); //no token
    } else {
        console.log("auth header", authHeader)
        const token = authHeader.split(' ')[1]; //on récupère le token
        console.log("token", token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => { //on vérifie le token
            if (err) {
                console.log("err", err);
                res.status(403).json({ message: "Vérification du token échouée " }); //invalid token
                //403 = forbiden access
            };
            console.log("decoded", decoded);
            req.emailM = decoded.email; //on stocke l'email du Medecin dans la requête
            next();
        });
    };
};

module.exports = verifyJWT;