const mongoose = require('mongoose');
require('dotenv').config();

// Import the Message model
const Message = require('../models/Message');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://gayatridhanush3:ZpPeCtC952CEwMvq@cluster0.sovcbsw.mongodb.net/whatsapp?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing data
    console.log('Clearing existing messages...');
    await Message.deleteMany({});
    console.log('✅ All messages cleared');
    
    // Close connection
    await mongoose.disconnect();
    console.log('✅ Database connection closed');
    
    // Run import script
    console.log('🔄 Now run: npm run import');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    process.exit(1);
  }
});
