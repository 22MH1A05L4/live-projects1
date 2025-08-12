const mongoose = require('mongoose');
require('dotenv').config();

// Test MongoDB connection
async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://gayatridhanush3:ZpPeCtC952CEwMvq@cluster0.sovcbsw.mongodb.net/whatsapp?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connection successful');
    
    // Test the Message model
    const Message = require('./models/Message');
    const count = await Message.countDocuments();
    console.log(`✅ Message collection has ${count} documents`);
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testConnection();



