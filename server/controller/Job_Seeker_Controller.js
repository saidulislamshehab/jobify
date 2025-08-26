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

export const loginJobSeeker = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('Login attempt:', { email, password });
        
        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Clean the email input (trim whitespace and convert to lowercase)
        const cleanEmail = email.trim().toLowerCase();
        console.log('Clean email:', cleanEmail);

        // Find job seeker by email (case-insensitive search)
        const jobSeeker = await Job_Seeker.findOne({ 
            email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') }
        });
        console.log('Found job seeker:', jobSeeker ? 'Yes' : 'No');
        
        if (!jobSeeker) {
            console.log('No job seeker found with email:', cleanEmail);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log('Stored email:', jobSeeker.email);
        console.log('Stored password:', jobSeeker.password);
        console.log('Input password:', password);
        console.log('Password match:', jobSeeker.password === password);

        // Check password (in production, you should hash passwords)
        if (jobSeeker.password !== password) {
            console.log('Password mismatch');
            return res.status(401).json({ message: "Invalid email or password" });
        }

        console.log('Login successful for:', cleanEmail);

        // Return job seeker data (excluding password)
        const { password: _, ...jobSeekerData } = jobSeeker.toObject();
        res.status(200).json({
            message: "Login successful",
            user: jobSeekerData
        });
    } catch (error) {
        console.error('Login error:', error);
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

export const getJobSeekerById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const jobSeeker = await Job_Seeker.findById(id).select('-password'); // Exclude password
        
        if (!jobSeeker) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(jobSeeker);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
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

