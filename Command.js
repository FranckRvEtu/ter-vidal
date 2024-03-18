import mongoose from 'mongoose';
const MONGODB_URI = "mongodb://127.0.0.1:27017/vidal"; // fait belek francky, c'est pas bon ça

const PORT = process.env.PORT || 3000 || 5000 || 8080 || 8100;


const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected...');
         // await addPatientToDB(); // pour tester la connexion, à retirer par la suite

    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

;

export default connectDB; // exporte la fonction connectDB pour l'utiliser dans server.js