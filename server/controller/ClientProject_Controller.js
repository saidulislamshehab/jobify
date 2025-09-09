import ClientProject from "../models/ClientProject.js";

export const createClientProject = async (req, res) => {
    try {
        console.log('Received project creation request:', req.body);
        const { title, description, paymentOption, budget, skills, clientId, clientEmail, clientCountry } = req.body;
        
        // Validate required fields
        if (!title || !description || !paymentOption || !budget || !clientId || !clientEmail) {
            console.log('Validation failed - missing required fields:', {
                title: !!title,
                description: !!description,
                paymentOption: !!paymentOption,
                budget: !!budget,
                clientId: !!clientId,
                clientEmail: !!clientEmail
            });
            return res.status(400).json({ 
                message: "Title, description, payment option, budget, client ID, and client email are required" 
            });
        }

        // Validate payment option
        if (!['hourly', 'per-project'].includes(paymentOption)) {
            return res.status(400).json({ 
                message: "Payment option must be either 'hourly' or 'per-project'" 
            });
        }

        // Validate skills array
        if (!Array.isArray(skills)) {
            return res.status(400).json({ 
                message: "Skills must be an array" 
            });
        }

        const clientProject = new ClientProject({
            title,
            description,
            paymentOption,
            budget,
            skills,
            clientId,
            clientEmail,
            clientCountry: clientCountry || 'United States',
            status: 'draft'
        });

        await clientProject.save();
        console.log('Project saved successfully:', clientProject);
        
        res.status(201).json({
            message: "Project created successfully",
            project: clientProject
        });
    } catch (error) {
        console.error('Error creating client project:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        res.status(500).json({ message: error.message });
    }
};

export const getClientProjects = async (req, res) => {
    try {
        const { clientId, status } = req.query;
        console.log('getClientProjects called with clientId:', clientId, 'status:', status);
        
        let query = {};
        if (clientId) {
            query.clientId = clientId;
        }
        if (status) {
            query.status = status;
        }

        console.log('Query for projects:', query);
        const projects = await ClientProject.find(query).sort({ createdAt: -1 });
        console.log('Found projects:', projects.length, 'projects');
        
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching client projects:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getClientProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        const project = await ClientProject.findById(id);
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateClientProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, paymentOption, budget, skills, status, clientCountry } = req.body;
        
        if (!id) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        // Validate payment option if provided
        if (paymentOption && !['hourly', 'per-project'].includes(paymentOption)) {
            return res.status(400).json({ 
                message: "Payment option must be either 'hourly' or 'per-project'" 
            });
        }

        // Validate status if provided
        if (status && !['draft', 'published', 'in-progress', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ 
                message: "Invalid status value" 
            });
        }

        const updateData = { updatedAt: Date.now() };
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (paymentOption) updateData.paymentOption = paymentOption;
        if (budget) updateData.budget = budget;
        if (skills) updateData.skills = skills;
        if (status) updateData.status = status;
        if (clientCountry) updateData.clientCountry = clientCountry;

        const project = await ClientProject.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project
        });
    } catch (error) {
        console.error('Error updating client project:', error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteClientProject = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        const project = await ClientProject.findByIdAndDelete(id);
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error('Error deleting client project:', error);
        res.status(500).json({ message: error.message });
    }
};

export const publishClientProject = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        const project = await ClientProject.findByIdAndUpdate(
            id, 
            { status: 'published', updatedAt: Date.now() }, 
            { new: true }
        );
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            message: "Project published successfully",
            project
        });
    } catch (error) {
        console.error('Error publishing client project:', error);
        res.status(500).json({ message: error.message });
    }
};
