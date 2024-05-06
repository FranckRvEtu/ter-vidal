const express = require('express') 
const cors = require('cors');
const verifyJWT = require('../front-end/middleWare/verifyJWT')
const credentials = require('../front-end/middleWare/credentiels.js');
const corsOptions = require('./config/corsOptions');

const app = express();
require('dotenv').config();
require("./config/db_conn.js");
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());

app.use(verifyJWT);
app.use("/", require("./routes/patientRoute.js"))
app.use("/", require("./routes/antecedantRoute.js"))

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// Connexion à MongoDB