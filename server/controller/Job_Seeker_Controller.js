import Job_Seeker from "../models/Job_Seeker.js";

export const createJobSeeker = async (req, res) => {
    try {
        const { name, age, email, password, phone, address, city, state, country, zip, education, experience, skills, resume, coverLetter, jobTitle } = req.body;
        const jobSeeker = new Job_Seeker({ name, age, email, password, phone, address, city, state, country, zip, education, experience, skills, resume, coverLetter, jobTitle });
        await jobSeeker.save();
        res.status(201).json(jobSeeker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getJobSeeker = async (req, res) => {
    try {
        const jobSeekers = await Job_Seeker.find();
        res.status(200).json(jobSeekers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateJobSeeker = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, email, password, phone, address, city, state, country, zip, education, experience, skills, resume, coverLetter, jobTitle } = req.body;
        const jobSeeker = await Job_Seeker.findByIdAndUpdate(id, { name, age, email, password, phone, address, city, state, country, zip, education, experience, skills, resume, coverLetter, jobTitle }, { new: true });
        res.status(200).json(jobSeeker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteJobSeeker = async (req, res) => {
    try {
        const { id } = req.params;
        await Job_Seeker.findByIdAndDelete(id);
        res.status(200).json({ message: "Job Seeker deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

