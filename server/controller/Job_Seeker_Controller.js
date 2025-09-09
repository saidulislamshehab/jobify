import Job_Seeker from "../models/Job_Seeker.js";

export const createJobSeeker = async (req, res) => {
    try {
        const { name, email, password, phone, country, education, experience } = req.body;
        
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }
        
        // Check if user already exists
        const existingUser = await Job_Seeker.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        
        // Create job seeker with only provided fields - MongoDB will apply defaults
        const jobSeeker = new Job_Seeker({ 
            name, 
            email, 
            password
        });
        
        await jobSeeker.save();
        
        // Return job seeker data without password
        const { password: _, ...jobSeekerData } = jobSeeker.toObject();
        res.status(201).json(jobSeekerData);
    } catch (error) {
        console.error('Error creating job seeker:', error);
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
        const { name, email, password, phone, country, education, experience, skills, resume, clientAboutMe, freelancerAboutMe, language, jobTitle } = req.body;
        const jobSeeker = await Job_Seeker.findByIdAndUpdate(id, { 
            name, 
            email, 
            password, 
            phone, 
            country, 
            education, 
            experience, 
            skills, 
            resume, 
            clientAboutMe, 
            freelancerAboutMe, 
            language, 
            jobTitle 
        }, { new: true });
        res.status(200).json(jobSeeker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSkills = async (req, res) => {
    try {
        const { id } = req.params;
        const { skills } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!skills || !Array.isArray(skills)) {
            return res.status(400).json({ message: "Skills must be an array" });
        }

        const jobSeeker = await Job_Seeker.findByIdAndUpdate(
            id, 
            { skills }, 
            { new: true }
        ).select('-password');

        if (!jobSeeker) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Skills updated successfully",
            user: jobSeeker
        });
    } catch (error) {
        console.error('Error updating skills:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateAboutMe = async (req, res) => {
    try {
        const { id } = req.params;
        const { freelancerAboutMe, clientAboutMe } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Build update object with only provided fields
        const updateData = {};
        if (freelancerAboutMe !== undefined) {
            updateData.freelancerAboutMe = freelancerAboutMe;
        }
        if (clientAboutMe !== undefined) {
            updateData.clientAboutMe = clientAboutMe;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "At least one about me field is required" });
        }

        const jobSeeker = await Job_Seeker.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true }
        ).select('-password');

        if (!jobSeeker) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "About me updated successfully",
            user: jobSeeker
        });
    } catch (error) {
        console.error('Error updating about me:', error);
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

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, jobTitle, country, hourlyRate, profilePhoto } = req.body;
        
        console.log('Update profile request:', { id, name, jobTitle, country, hourlyRate, profilePhoto });
        
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
        if (country !== undefined) updateData.country = country;
        if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate;
        if (profilePhoto !== undefined) updateData.profilePhoto = profilePhoto;
        
        console.log('Update data:', updateData);
        
        const jobSeeker = await Job_Seeker.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        console.log('Updated job seeker:', jobSeeker);
        
        if (!jobSeeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }
        
        res.json({ 
            message: 'Profile updated successfully',
            jobSeeker: {
                id: jobSeeker._id,
                name: jobSeeker.name,
                jobTitle: jobSeeker.jobTitle,
                country: jobSeeker.country,
                hourlyRate: jobSeeker.hourlyRate,
                profilePhoto: jobSeeker.profilePhoto
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: error.message });
    }
};

