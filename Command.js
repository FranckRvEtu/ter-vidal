const MONGODB_URI = "mongodb+srv://franckreveille:dBcp0SCvEnXYb5kA@vidal.yti6o8s.mongodb.net/Vidal"; // fait belek francky, c'est pas bon ça
const mongoose = require("mongoose");



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

module.exports = connectDB;
