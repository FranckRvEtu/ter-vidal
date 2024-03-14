import express from 'express';
import cors from 'cors';
import connectDB from './src/config/database.js';

const app = express();

app.use(cors());
app.use(express.json());


// Connexion à MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
