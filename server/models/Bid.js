import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientProject',
        required: true
    },
    freelancerId: {
        type: String,
        required: true
    },
    freelancerName: {
        type: String,
        required: true
    },
    freelancerEmail: {
        type: String,
        required: true
    },
    bidAmount: {
        type: Number,
        required: true,
        min: 0
    },
    deliveryTime: {
        type: Number, // in days
        required: true,
        min: 1
    },
    coverLetter: {
        type: String,
        required: true,
        trim: true,
        minlength: 50,
        maxlength: 1000
    },
    proposedSkills: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
        default: 'pending'
    },
    clientResponse: {
        type: String,
        trim: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
bidSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for faster queries
bidSchema.index({ projectId: 1, freelancerId: 1 }, { unique: true }); // One bid per freelancer per project
bidSchema.index({ projectId: 1, status: 1 });
bidSchema.index({ freelancerId: 1, status: 1 });

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
