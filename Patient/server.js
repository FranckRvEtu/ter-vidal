import express from 'express';
import cors from 'cors';
import connectDB from '../../command.js';
import PORT from '../../command.js'; 
const app = express();

app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});