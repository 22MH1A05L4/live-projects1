WhatsApp Web Chat Application
A complete WhatsApp Web-like chat application with a Node.js backend and Next.js frontend. This project simulates WhatsApp Business API webhooks and provides a fully functional chat interface.

🚀 Features
Backend
RESTful API with Express.js
MongoDB Atlas integration with Mongoose
JSON Payload Processing for WhatsApp Business API webhooks
Message Status Tracking (sent, delivered, read)
CORS Support for frontend integration
Frontend
WhatsApp-like UI with familiar design
Responsive Design for mobile, tablet, and desktop
Real-time Updates with immediate message display
Message Status Indicators with visual ticks
Mobile Navigation with touch-friendly interface
TypeScript for type safety
📁 Project Structure
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
🛠️ Quick Start
Prerequisites
Node.js (v18 or higher)
MongoDB Atlas account
npm or yarn
Backend Setup
Navigate to backend directory:
cd backend
Install dependencies:
npm install
Set up environment variables:
cp env.example .env
Edit .env with your MongoDB Atlas connection string:

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp?retryWrites=true&w=majority
Import sample data:
npm run import
Start the server:
npm run dev
Backend will be available at http://localhost:5000

Frontend Setup
Navigate to frontend directory:
cd frontend
Install dependencies:
npm install
Set up environment variables:
cp env.example .env.local
Edit .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000/api
Start the development server:
npm run dev
Frontend will be available at http://localhost:3000
