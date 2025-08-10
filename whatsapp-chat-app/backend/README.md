# WhatsApp Chat Backend API

A Node.js backend API for a WhatsApp Web-like chat application built with Express, MongoDB, and Mongoose.

## Features

- RESTful API endpoints for conversations and messages
- MongoDB Atlas integration with Mongoose ODM
- JSON payload import script for WhatsApp Business API webhooks
- Message status tracking (sent, delivered, read)
- CORS enabled for frontend integration

## API Endpoints

### Conversations
- `GET /api/conversations` - Get all conversations with last message preview

### Messages
- `GET /api/messages/:wa_id` - Get all messages for a specific conversation
- `POST /api/send` - Send a new message

### Health Check
- `GET /health` - API health status

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `env.example`:
```bash
cp env.example .env
```

4. Update the `.env` file with your MongoDB Atlas connection string:
```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/whatsapp?retryWrites=true&w=majority
```

5. Import the sample JSON payloads:
```bash
npm run import
```

6. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Database Schema

### Message Collection (`processed_messages`)

```javascript
{
  wa_id: String,           // WhatsApp ID of the user
  name: String,            // User's display name
  from: String,            // Sender's phone number
  message_id: String,      // Unique message ID
  text: String,            // Message content
  timestamp: Number,       // Unix timestamp
  status: String,          // 'sent', 'delivered', or 'read'
  type: String,            // Message type (default: 'text')
  isFromUser: Boolean,     // Whether message is from user or business
  createdAt: Date,         // Message creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

## Deployment

### Render.com

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 10000 (Render default)

### Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add environment variables in the Railway dashboard
4. Deploy automatically

### Heroku

1. Create a new app on Heroku
2. Connect your GitHub repository
3. Add MongoDB Atlas addon
4. Set environment variables in Heroku dashboard
5. Deploy

## Environment Variables

- `MONGODB_URI`: MongoDB Atlas connection string
- `PORT`: Server port (default: 5000)
- `CORS_ORIGIN`: Allowed CORS origin (default: http://localhost:3000)

## Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm run import`: Import JSON payloads from scripts/payloads/

## License

MIT



