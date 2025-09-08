import mongoose from "mongoose";

const clientProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    paymentOption: {
        type: String,
        required: true,
        enum: ['hourly', 'per-project']
    },
    budget: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: [String],
        required: true,
        default: []
    },
    clientId: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'in-progress', 'completed', 'cancelled'],
        default: 'draft'
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
clientProjectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const ClientProject = mongoose.model("ClientProject", clientProjectSchema);

export default ClientProject;
