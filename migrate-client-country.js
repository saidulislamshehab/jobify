// Migration script to add clientCountry to existing projects
import mongoose from 'mongoose';
import ClientProject from './server/models/ClientProject.js';

const migrateClientCountry = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/jobify', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Find all projects without clientCountry
    const projectsWithoutCountry = await ClientProject.find({
      $or: [
        { clientCountry: { $exists: false } },
        { clientCountry: null },
        { clientCountry: '' }
      ]
    });

    console.log(`Found ${projectsWithoutCountry.length} projects without clientCountry`);

    // Update each project with default country
    for (const project of projectsWithoutCountry) {
      await ClientProject.findByIdAndUpdate(project._id, {
        clientCountry: 'United States'
      });
      console.log(`Updated project ${project._id} with default country`);
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateClientCountry();
