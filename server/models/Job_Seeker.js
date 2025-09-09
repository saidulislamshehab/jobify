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
        type : [{
            text: {
                type: String,
                required: false
            }
        }],
        default : []
    },
    experience : {
        type : [{
            text: {
                type: String,
                required: false
            }
        }],
        default : []
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
        default : 'Not provided',
    },
    freelancerAboutMe : {
        type : String,
        default : 'Not provided',
    },
    languages : {
        type : [{
            text: {
                type: String,
                required: false
            }
        }],
        default : [{ text: 'English' }]
    },
    jobTitle : {
        type : String,
        default : 'Not specified',
    },
    profilePhoto : {
        type : String,
        default : '/man.png',
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