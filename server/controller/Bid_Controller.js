import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import ClientProject from "../models/ClientProject.js";
import Job_Seeker from "../models/Job_Seeker.js";

// Create a new bid
export const createBid = async (req, res) => {
    try {
        const { projectId, freelancerId, bidAmount, deliveryTime, coverLetter, proposedSkills } = req.body;

        // Validate required fields
        if (!projectId || !freelancerId || !bidAmount || !deliveryTime || !coverLetter) {
            return res.status(400).json({ 
                message: "All fields are required: projectId, freelancerId, bidAmount, deliveryTime, coverLetter" 
            });
        }

        // Check if project exists and is published
        const project = await ClientProject.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.status !== 'published') {
            return res.status(400).json({ message: "Cannot bid on unpublished projects" });
        }

        // Check if freelancer exists
        const freelancer = await Job_Seeker.findById(freelancerId);
        if (!freelancer) {
            return res.status(404).json({ message: "Freelancer not found" });
        }

        // Check if freelancer already has a bid on this project
        const existingBid = await Bid.findOne({ projectId, freelancerId });
        if (existingBid) {
            return res.status(400).json({ message: "You have already placed a bid on this project" });
        }

        // Create new bid
        const newBid = new Bid({
            projectId,
            freelancerId,
            freelancerName: freelancer.name,
            freelancerEmail: freelancer.email,
            bidAmount: parseFloat(bidAmount),
            deliveryTime: parseInt(deliveryTime),
            coverLetter: coverLetter.trim(),
            proposedSkills: Array.isArray(proposedSkills) ? proposedSkills : []
        });

        const savedBid = await newBid.save();
        
        // Populate project details for response
        await savedBid.populate('projectId', 'title description budget paymentOption');

        res.status(201).json({
            message: "Bid placed successfully",
            bid: savedBid
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "You have already placed a bid on this project" });
        }
        console.error("Error creating bid:", error);
        res.status(500).json({ message: "Failed to place bid", error: error.message });
    }
};

// Get all bids for a project
export const getBidsForProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        const bids = await Bid.find({ projectId })
            .populate('projectId', 'title description budget paymentOption clientId')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Bids retrieved successfully",
            bids,
            count: bids.length
        });
    } catch (error) {
        console.error("Error fetching bids for project:", error);
        res.status(500).json({ message: "Failed to fetch bids", error: error.message });
    }
};

// Get all bids by a freelancer
export const getBidsByFreelancer = async (req, res) => {
    try {
        const { freelancerId } = req.params;

        if (!freelancerId) {
            return res.status(400).json({ message: "Freelancer ID is required" });
        }

        const bids = await Bid.find({ freelancerId })
            .populate('projectId', 'title description budget paymentOption clientId status')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Freelancer bids retrieved successfully",
            bids,
            count: bids.length
        });
    } catch (error) {
        console.error("Error fetching freelancer bids:", error);
        res.status(500).json({ message: "Failed to fetch bids", error: error.message });
    }
};

// Update bid status (accept/reject)
export const updateBidStatus = async (req, res) => {
    try {
        const { bidId } = req.params;
        const { status, clientResponse } = req.body;

        if (!bidId) {
            return res.status(400).json({ message: "Bid ID is required" });
        }

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Status must be 'accepted' or 'rejected'" });
        }

        const bid = await Bid.findById(bidId).populate('projectId');
        if (!bid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        if (bid.status !== 'pending') {
            return res.status(400).json({ message: "Cannot update bid status. Bid is not pending." });
        }

        // Update bid status
        bid.status = status;
        if (clientResponse) {
            bid.clientResponse = clientResponse.trim();
        }

        await bid.save();

        // If bid is accepted, update project status and reject other bids
        if (status === 'accepted') {
            // Update project status to in-progress
            await ClientProject.findByIdAndUpdate(bid.projectId._id, { 
                status: 'in-progress'
            });

            // Reject all other pending bids for this project
            await Bid.updateMany(
                { 
                    projectId: bid.projectId._id, 
                    _id: { $ne: bidId },
                    status: 'pending'
                },
                { 
                    status: 'rejected',
                    clientResponse: 'Another bid was accepted for this project.'
                }
            );
        }

        res.status(200).json({
            message: `Bid ${status} successfully`,
            bid
        });
    } catch (error) {
        console.error("Error updating bid status:", error);
        res.status(500).json({ message: "Failed to update bid status", error: error.message });
    }
};

// Withdraw a bid (freelancer can withdraw their own bid)
export const withdrawBid = async (req, res) => {
    try {
        const { bidId } = req.params;
        const { freelancerId } = req.body;

        if (!bidId || !freelancerId) {
            return res.status(400).json({ message: "Bid ID and Freelancer ID are required" });
        }

        const bid = await Bid.findById(bidId);
        if (!bid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        if (bid.freelancerId !== freelancerId) {
            return res.status(403).json({ message: "You can only withdraw your own bids" });
        }

        if (bid.status !== 'pending') {
            return res.status(400).json({ message: "Cannot withdraw bid. Bid is not pending." });
        }

        bid.status = 'withdrawn';
        await bid.save();

        res.status(200).json({
            message: "Bid withdrawn successfully",
            bid
        });
    } catch (error) {
        console.error("Error withdrawing bid:", error);
        res.status(500).json({ message: "Failed to withdraw bid", error: error.message });
    }
};

// Get a specific bid by ID
export const getBidById = async (req, res) => {
    try {
        const { bidId } = req.params;

        if (!bidId) {
            return res.status(400).json({ message: "Bid ID is required" });
        }

        const bid = await Bid.findById(bidId)
            .populate('projectId', 'title description budget paymentOption clientId status');

        if (!bid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        res.status(200).json({
            message: "Bid retrieved successfully",
            bid
        });
    } catch (error) {
        console.error("Error fetching bid:", error);
        res.status(500).json({ message: "Failed to fetch bid", error: error.message });
    }
};

// Get bid statistics for a project
export const getBidStats = async (req, res) => {
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        const stats = await Bid.aggregate([
            { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    avgBidAmount: { $avg: "$bidAmount" },
                    minBidAmount: { $min: "$bidAmount" },
                    maxBidAmount: { $max: "$bidAmount" }
                }
            }
        ]);

        const totalBids = await Bid.countDocuments({ projectId });

        res.status(200).json({
            message: "Bid statistics retrieved successfully",
            totalBids,
            stats
        });
    } catch (error) {
        console.error("Error fetching bid stats:", error);
        res.status(500).json({ message: "Failed to fetch bid statistics", error: error.message });
    }
};
