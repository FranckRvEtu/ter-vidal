const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authoriztion'];
    if (!authHeader) {
        res.status(401).json({ message: "Middleware Pas de token"});
    } else {
        console.log("auth header", authHeader)
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).json({ message: "Pas de token middleware 2" }); //invalid token
                //403 = forbiden access
            };
            req.userId = decoded._id;
            next();
        });
    };
};

module.exports = verifyJWT;