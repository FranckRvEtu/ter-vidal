const express = require('express') 
const cors = require('cors');

const app = express();
require('dotenv').config();
require("./config/db_conn.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/rdvRoute.js"));

const PORT = process.env.PORT || 6000 ;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Connexion à MongoDB