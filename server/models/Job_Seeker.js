import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
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
    hourlyRate : {
        type : String,
        default : 'Not specified',
    },
    country : {
        type : String,
        default : 'Not provided',
    },
    education : {
        type : String,
        default : 'Not specified',
    },
    experience : {
        type : String,
    },
    skills : {
        type : [String],
        default : ['Not specified'],
    },
    resume : {
        type : String,
        default : '',
    },
    clientAboutMe : {
        type : String,
        default : 'Tell us about yourself as a client...',
    },
    freelancerAboutMe : {
        type : String,
        default : 'Tell us about yourself as a freelancer...',
    },
    language : {
        type : String,
        default : 'English',
    },
    jobTitle : {
        type : String,
        default : 'Not specified',
    },
    profilePhoto : {
        type : String,
        default : '',
    },
    githubProjects : {
        type : [{
            name: {
                type: String,
                default: ''
            },
            githubLink: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            }
        }],
        default : []
    }
});

const Job_Seeker = mongoose.model("Job_Seeker", studentSchema);

export default Job_Seeker;