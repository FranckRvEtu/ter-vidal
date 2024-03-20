import express from "express";
import cors from "cors";
import connectDB from "../Command.js";
import addRDVToDB from "./config/database.js";


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;



// Connexion à MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        (async () => {
            try {
                await addRDVToDB();
                
            } catch (err) {
                console.error('Erreur lors de l\'ajout de l\'ordonnance:', err);

            }
        })();
    });
});