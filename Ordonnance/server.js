const express = require('express') 
const cors = require('cors');

const app = express();
require('dotenv').config();
require("./config/db_conn.js");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3010 ;



// Connexion à MongoDB

