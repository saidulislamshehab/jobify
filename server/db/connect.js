import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Use environment variable or default to local MongoDB
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/jobify";
        console.log('Attempting to connect to MongoDB at:', mongoURI);
        
        await mongoose.connect(mongoURI);
        console.log(" Connected to MongoDB successfully");
        console.log("Database name:", mongoose.connection.name);
        console.log("Host:", mongoose.connection.host);
        console.log("Port:", mongoose.connection.port);
    } catch (error) {
        console.error(" Couldn't connect to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;