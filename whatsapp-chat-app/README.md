# WhatsApp Web Chat Application

A complete WhatsApp Web-like chat application with a Node.js backend and Next.js frontend. This project simulates WhatsApp Business API webhooks and provides a fully functional chat interface.

## 🚀 Features

### Backend
- **RESTful API** with Express.js
- **MongoDB Atlas** integration with Mongoose
- **JSON Payload Processing** for WhatsApp Business API webhooks
- **Message Status Tracking** (sent, delivered, read)
- **CORS Support** for frontend integration

### Frontend
- **WhatsApp-like UI** with familiar design
- **Responsive Design** for mobile, tablet, and desktop
- **Real-time Updates** with immediate message display
- **Message Status Indicators** with visual ticks
- **Mobile Navigation** with touch-friendly interface
- **TypeScript** for type safety

## 📁 Project Structure

```
whatsapp-chat-app/
├── backend/                 # Node.js + Express API
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── scripts/            # Data import utilities
│   │   └── payloads/       # JSON webhook payloads
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── frontend/               # Next.js + TypeScript app
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript definitions
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend documentation
└── README.md              # This file
```

## 🛠️ Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp env.example .env
```
Edit `.env` with your MongoDB Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp?retryWrites=true&w=majority
```

4. **Import sample data:**
```bash
npm run import
```

5. **Start the server:**
```bash
npm run dev
```

Backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp env.example .env.local
```
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. **Start the development server:**
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 📊 API Endpoints

### Conversations
- `GET /api/conversations` - Get all conversations with last message preview

### Messages
- `GET /api/messages/:wa_id` - Get all messages for a specific conversation
- `POST /api/send` - Send a new message

### Health Check
- `GET /health` - API health status

## 🗄️ Database Schema

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

## 📱 Sample Data

The application comes with 8 JSON payload files that simulate WhatsApp Business API webhooks:

- **Conversation 1**: Ravi Kumar (2 messages + status updates)
- **Conversation 2**: Neha Joshi (2 messages + status updates)

These files are automatically imported when you run `npm run import` in the backend.

## 🚀 Deployment

### Backend Deployment

#### Render.com
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 10000 (Render default)

#### Railway
1. Create a new project
2. Connect your GitHub repository
3. Add environment variables in dashboard
4. Deploy automatically

### Frontend Deployment

#### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL
4. Deploy automatically

## 🔧 Environment Variables

### Backend
- `MONGODB_URI`: MongoDB Atlas connection string
- `PORT`: Server port (default: 5000)
- `CORS_ORIGIN`: Allowed CORS origin

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API URL

## 📱 Responsive Design

The application is fully responsive:

- **Desktop**: Side-by-side conversation list and chat
- **Tablet**: Optimized layout for medium screens  
- **Mobile**: Single view with navigation between list and chat

## 🎯 Features Demo

1. **View Conversations**: See all chats with last message preview
2. **Select Chat**: Click on any conversation to view messages
3. **Send Messages**: Type and send new messages
4. **Message Status**: See sent, delivered, and read indicators
5. **Mobile Navigation**: Use back button on mobile to return to conversation list

## 🛡️ Security

- CORS protection for API endpoints
- Input validation on all endpoints
- Environment variable protection
- No sensitive data in client-side code

## 📈 Performance

- Optimized MongoDB queries with indexes
- Efficient React re-rendering
- Minimal API calls with proper caching
- Responsive images and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify your MongoDB connection string
3. Ensure all environment variables are set correctly
4. Check that both backend and frontend are running

## 🎉 Success Criteria

✅ **Functional End-to-End**: Open frontend, see chats from JSON payloads, click into conversations, send messages, save to DB

✅ **Responsive Design**: Works on mobile, tablet, and desktop

✅ **WhatsApp-like UI**: Familiar interface with proper styling

✅ **Real-time Updates**: Messages appear immediately after sending

✅ **Status Indicators**: Visual ticks for message status

✅ **Mobile Navigation**: Touch-friendly with back button

✅ **Deployment Ready**: Instructions for Vercel and Render/Railway

The application is now ready for deployment and use! 🚀



