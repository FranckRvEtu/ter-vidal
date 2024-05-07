const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("headers", req.headers);
    if (!authHeader) {
        console.log("req.headers:", req.headers['uthorization']);
        res.status(401).json({ message: "Middleware Pas de token"});
    } else {
        console.log("auth header", authHeader)
        const token = authHeader//.split(' ')[1];
        console.log("token", token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log("err", err);
                res.status(403).json({ message: "Pas de token middleware 2" }); //invalid token
                //403 = forbiden access
            };
            console.log("decoded", decoded);
            req.userId = decoded.email;
            next();
        });
    };
};

module.exports = verifyJWT;