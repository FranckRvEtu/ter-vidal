const express = require('express') 
const cors = require('cors');
const controller = require('./controllers/ordonnanceController.js');
const app = express();
require('dotenv').config();
require("./config/db_conn.js");
app.use(cors());
app.use(express.json());


