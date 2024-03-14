import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://franckreveille:m@vidal.yti6o8s.mongodb.net/?retryWrites=true&w=majority&appName=vidal'; // fait belek francky, c'est pas bon ça

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};


export default connectDB;
