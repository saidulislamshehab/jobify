// Migration script to update education and experience fields for existing users
const mongoose = require('mongoose');
const Job_Seeker = require('./server/models/Job_Seeker.js').default;

const migrateUserData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/jobify', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // Find all users
    const users = await Job_Seeker.find({});
    console.log(`Found ${users.length} users to migrate`);
    
    for (const user of users) {
      let needsUpdate = false;
      const updates = {};
      
      // Check and migrate education field
      if (user.education && Array.isArray(user.education)) {
        const migratedEducation = user.education.map(edu => {
          if (typeof edu === 'string') {
            return { text: edu };
          } else if (edu && typeof edu === 'object' && !edu.text) {
            // Handle old format with multiple fields
            const text = Object.values(edu).filter(val => val && val !== '').join(', ');
            return { text: text || 'Education entry' };
          }
          return edu; // Already in correct format
        });
        
        if (JSON.stringify(migratedEducation) !== JSON.stringify(user.education)) {
          updates.education = migratedEducation;
          needsUpdate = true;
        }
      }
      
      // Check and migrate experience field
      if (user.experience && Array.isArray(user.experience)) {
        const migratedExperience = user.experience.map(exp => {
          if (typeof exp === 'string') {
            return { text: exp };
          } else if (exp && typeof exp === 'object' && !exp.text) {
            // Handle old format with multiple fields
            const text = Object.values(exp).filter(val => val && val !== '').join(', ');
            return { text: text || 'Experience entry' };
          }
          return exp; // Already in correct format
        });
        
        if (JSON.stringify(migratedExperience) !== JSON.stringify(user.experience)) {
          updates.experience = migratedExperience;
          needsUpdate = true;
        }
      }
      
      // Update user if needed
      if (needsUpdate) {
        await Job_Seeker.findByIdAndUpdate(user._id, updates);
        console.log(`Migrated user: ${user.name} (${user.email})`);
      }
    }
    
    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

migrateUserData();
