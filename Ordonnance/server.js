const express = require('express') 
const cors = require('cors');
const controller = require('./controllers/ordonnanceController.js');
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

const port = process.env.PORT || 3013;

app.use(verifyJWT);
app.use('/',require("./routes/ordonnanceRoute"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

