import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    address : {
        type : String,
    },
    city : {
        type : String,
        required : true,
    },
    state : {
        type : String,
    },
    country : {
        type : String,
        required : true,
    },
    zip : {
        type : String,
    },
    education : {
        type : String,
        required : true,
    },
    experience : {
        type : String,
    },
    skills : {
        type : String,
        required : true,
    },
    resume : {
        type : String,
    },
    coverLetter : {
        type : String,
        required : true,
    },
    jobTitle : {
        type : String,
    }
});

const Job_Seeker = mongoose.model("Job_Seeker", studentSchema);

export default Job_Seeker;