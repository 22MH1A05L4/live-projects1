# WhatsApp Web Frontend

A modern, responsive WhatsApp Web-like chat application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **WhatsApp-like UI**: Familiar interface with conversation list and chat view
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Real-time Updates**: Messages update immediately after sending
- **Message Status**: Visual indicators for sent, delivered, and read messages
- **Mobile Navigation**: Touch-friendly interface with back navigation
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Date Handling**: date-fns
- **State Management**: React Hooks
- **API**: Fetch API for backend communication

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `env.example`:
```bash
cp env.example .env.local
```

4. Update the `.env.local` file with your backend API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Main chat application
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── Chat.tsx        # Main chat interface
│   ├── ConversationList.tsx  # Conversation sidebar
│   └── Message.tsx     # Individual message component
├── services/           # API services
│   └── api.ts          # Backend API communication
└── types/              # TypeScript type definitions
    └── index.ts        # Application types
```

## Components

### ConversationList
- Displays all conversations in a sidebar
- Shows last message preview and timestamp
- Message status indicators
- Responsive design for mobile and desktop

### Chat
- Main chat interface with message history
- Message input with send functionality
- Auto-scroll to latest messages
- Loading states and error handling

### Message
- Individual message component
- WhatsApp-like message bubbles
- Status indicators (sent, delivered, read)
- Timestamp display

## API Integration

The frontend communicates with the backend through the following endpoints:

- `GET /api/conversations` - Fetch all conversations
- `GET /api/messages/:wa_id` - Fetch messages for a conversation
- `POST /api/send` - Send a new message

## Responsive Design

The application is fully responsive with:

- **Desktop**: Side-by-side conversation list and chat
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Single view with navigation between list and chat

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL
4. Deploy automatically

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (required)

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size with Next.js
- Efficient re-rendering with React
- Responsive images and lazy loading
- Minimal API calls with proper caching

## License

MIT
