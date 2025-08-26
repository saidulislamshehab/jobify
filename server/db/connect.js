import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Couldn't connect to MongoDB", error);
        process.exit(1);
    }
};

export default connectDB;