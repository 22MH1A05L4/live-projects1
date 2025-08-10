const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /messages/:wa_id - Get all messages for a specific conversation
router.get('/messages/:wa_id', async (req, res) => {
  try {
    const { wa_id } = req.params;
    const messages = await Message.find({ wa_id })
      .sort({ timestamp: 1 })
      .exec();
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /send - Send a new message
router.post('/send', async (req, res) => {
  try {
    const { wa_id, name, message } = req.body;
    
    if (!wa_id || !name || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = new Message({
      wa_id,
      name,
      from: '918329446654', // User's phone number
      text: message,
      timestamp: Math.floor(Date.now() / 1000),
      status: 'sent',
      type: 'text',
      isFromUser: true
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
