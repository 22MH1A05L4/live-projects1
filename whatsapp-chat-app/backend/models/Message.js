const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  wa_id: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  message_id: {
    type: String,
    unique: true,
    sparse: true
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  type: {
    type: String,
    default: 'text'
  },
  isFromUser: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient querying
messageSchema.index({ wa_id: 1, timestamp: -1 });

module.exports = mongoose.model('Message', messageSchema, 'processed_messages');



