const express = require('express') 
const cors = require('cors');

const verifyJWT = require('../middleWare/verifyJWT')
const credentials = require('../middleWare/credentiels.js');
const corsOptions = require('./config/corsOptions');

const app = express();
require('dotenv').config();
require("./config/db_conn.js");

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(verifyJWT);
app.use("/", require("./routes/visiteRoute.js"));

const PORT = process.env.PORT || 8000 ;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// Connexion à MongoDB