const express = require('express') 
const cors = require('cors');

const app = express();
require('dotenv').config();
require("./config/db_conn.js");
app.use(cors());
app.use(express.json());

app.use("/", require("./routes/patientRoute.js"))

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// Connexion à MongoDB