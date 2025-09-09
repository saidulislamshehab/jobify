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
            institution: {
                type: String,
                default: ''
            },
            degree: {
                type: String,
                default: ''
            },
            fieldOfStudy: {
                type: String,
                default: ''
            },
            startDate: {
                type: String,
                default: ''
            },
            endDate: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            }
        }],
        default : []
    },
    experience : {
        type : [{
            company: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: ''
            },
            startDate: {
                type: String,
                default: ''
            },
            endDate: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            current: {
                type: Boolean,
                default: false
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
        default : 'Tell us about yourself as a client...',
    },
    freelancerAboutMe : {
        type : String,
        default : 'Tell us about yourself as a freelancer...',
    },
    languages : {
        type : [{
            language: {
                type: String,
                default: 'English'
            },
            proficiency: {
                type: String,
                enum: ['Beginner', 'Intermediate', 'Advanced', 'Native'],
                default: 'Native'
            }
        }],
        default : [{ language: 'English', proficiency: 'Native' }]
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