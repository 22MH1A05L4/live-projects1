const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET /conversations - Get all conversations with last message preview
router.get('/conversations', async (req, res) => {
  try {
    // Aggregate to get the latest message for each conversation
    const conversations = await Message.aggregate([
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: '$wa_id',
          name: { $first: '$name' },
          lastMessage: { $first: '$text' },
          lastTimestamp: { $first: '$timestamp' },
          lastStatus: { $first: '$status' },
          messageCount: { $sum: 1 }
        }
      },
      {
        $sort: { lastTimestamp: -1 }
      }
    ]);

    // Transform the data to match frontend expectations
    const transformedConversations = conversations.map(conv => ({
      _id: conv._id,
      name: conv.name,
      lastMessage: conv.lastMessage,
      lastTimestamp: conv.lastTimestamp,
      lastStatus: conv.lastStatus,
      messageCount: conv.messageCount
    }));

    res.json(transformedConversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

module.exports = router;



