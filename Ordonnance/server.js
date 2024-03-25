const express = require('express') 
const cors = require('cors');

const app = express();
require('dotenv').config();
require("./config/db_conn.js");
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3010 ;


app.use('/addOrdonnance',require("./routes/route"));

// Connexion à MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        /*(async () => {
            try {
                await addOrdonnanceToDB();
                
            } catch (err) {
                console.error('Erreur lors de l\'ajout de l\'ordonnance:', err);

            }
        })();*/
    });
});

