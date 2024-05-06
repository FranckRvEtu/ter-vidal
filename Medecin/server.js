const express = require('express') 
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('../front-end/middleWare/credentiels.js');
const corsOptions = require('./config/corsOptions');

const app = express();
require('dotenv').config();
require("./config/db_conn.js");

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use("/", require("./routes/medecinRoute.js"))

const PORT = process.env.PORT || 3010 ;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





// Connexion à MongoDB