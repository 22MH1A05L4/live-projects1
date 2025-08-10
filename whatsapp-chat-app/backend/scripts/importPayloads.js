const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import the Message model
const Message = require('../models/Message');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/whatsapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB Atlas');
  await importPayloads();
});

async function importPayloads() {
  try {
    const payloadsDir = path.join(__dirname, 'payloads');
    
    // Create payloads directory if it doesn't exist
    if (!fs.existsSync(payloadsDir)) {
      fs.mkdirSync(payloadsDir, { recursive: true });
      console.log('Created payloads directory. Please add your JSON files there.');
      return;
    }

    const files = fs.readdirSync(payloadsDir).filter(file => file.endsWith('.json'));
    
    if (files.length === 0) {
      console.log('No JSON files found in payloads directory.');
      return;
    }

    console.log(`Found ${files.length} JSON files to process...`);
    console.log('All files:', files);

    // Sort files to process messages first, then statuses
    const messageFiles = files.filter(f => f.includes('message'));
    const statusFiles = files.filter(f => f.includes('status'));
    
    console.log(`Processing ${messageFiles.length} message files first...`);
    console.log('Message files:', messageFiles);
    for (const file of messageFiles) {
      try {
        console.log(`Processing ${file}...`);
        const filePath = path.join(payloadsDir, file);
        const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(`Payload structure for ${file}:`, {
          field: payload.metaData.entry[0].changes[0].field,
          hasMessages: !!payload.metaData.entry[0].changes[0].value.messages,
          hasStatuses: !!payload.metaData.entry[0].changes[0].value.statuses
        });
        await processPayload(payload);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
    
    console.log(`Processing ${statusFiles.length} status files...`);
    console.log('Status files:', statusFiles);
    for (const file of statusFiles) {
      console.log(`Processing ${file}...`);
      const filePath = path.join(payloadsDir, file);
      const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      await processPayload(payload);
    }

    console.log('All payloads processed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error importing payloads:', error);
    process.exit(1);
  }
}

async function processPayload(payload) {
  try {
    const entry = payload.metaData.entry[0];
    const changes = entry.changes[0];
    const value = changes.value;

    console.log(`Processing payload with field: ${changes.field}`);

    if (changes.field === 'messages' && value.messages) {
      console.log(`Found ${value.messages.length} messages to process`);
      // Process message payload
      for (const message of value.messages) {
        const contact = value.contacts.find(c => c.wa_id === message.from);
        
        // Determine the conversation wa_id
        // If message is from business number, use recipient's wa_id
        // If message is from user, use user's wa_id
        let conversationWaId;
        if (message.from === '918329446654') {
          // Business message - find recipient from contacts
          conversationWaId = value.contacts[0]?.wa_id;
        } else {
          // User message
          conversationWaId = message.from;
        }
        
        const messageDoc = {
          wa_id: conversationWaId,
          name: contact ? contact.profile.name : 'Unknown',
          from: message.from,
          message_id: message.id,
          text: message.text.body,
          timestamp: parseInt(message.timestamp),
          status: 'sent',
          type: message.type,
          isFromUser: message.from !== '918329446654'
        };

        // For business messages, we need to set the name correctly
        if (message.from === '918329446654') {
          // Find the recipient contact to get their name
          const recipientContact = value.contacts.find(c => c.wa_id !== '918329446654');
          if (recipientContact) {
            messageDoc.name = recipientContact.profile.name;
          }
        }

        // Check if message already exists
        const existingMessage = await Message.findOne({ message_id: message.id });
        if (!existingMessage) {
          await Message.create(messageDoc);
          console.log(`Inserted message: ${message.id} for conversation: ${conversationWaId}`);
        } else {
          console.log(`Message already exists: ${message.id}`);
        }
      }
    } else if (changes.field === 'messages' && value.statuses) {
      console.log(`Found ${value.statuses.length} statuses to process`);
      // Process status payload
      for (const status of value.statuses) {
        const messageId = status.id || status.meta_msg_id;
        
        if (messageId) {
          const updateResult = await Message.updateOne(
            { message_id: messageId },
            { 
              status: status.status
            }
          );
          
          if (updateResult.modifiedCount > 0) {
            console.log(`Updated status for message ${messageId}: ${status.status}`);
          } else {
            console.log(`Message not found for status update: ${messageId}`);
          }
        }
      }
    } else {
      console.log(`Payload type not recognized: field=${changes.field}, hasMessages=${!!value.messages}, hasStatuses=${!!value.statuses}`);
    }
  } catch (error) {
    console.error('Error processing payload:', error);
    throw error; // Re-throw to see the full error
  }
}



