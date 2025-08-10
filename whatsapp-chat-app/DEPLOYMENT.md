# Deployment Guide

This guide will help you deploy both the backend and frontend of the WhatsApp Chat Application.

## 🚀 Backend Deployment

### Option 1: Render.com (Recommended)

1. **Create a Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing this project

3. **Configure the Service**
   - **Name**: `whatsapp-chat-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Set Environment Variables**
   - Click on "Environment" tab
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp?retryWrites=true&w=majority
     PORT=10000
     CORS_ORIGIN=https://your-frontend-url.vercel.app
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the URL (e.g., `https://your-app.onrender.com`)

### Option 2: Railway

1. **Create a Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with your GitHub account

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure the Service**
   - Set the root directory to `backend`
   - Railway will auto-detect it's a Node.js project

4. **Set Environment Variables**
   - Go to "Variables" tab
   - Add the same environment variables as above

5. **Deploy**
   - Railway will automatically deploy
   - Note the generated URL

### Option 3: Heroku

1. **Create a Heroku Account**
   - Go to [heroku.com](https://heroku.com)
   - Sign up for an account

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-connection-string"
   heroku config:set CORS_ORIGIN="https://your-frontend-url.vercel.app"
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Set the root directory to `frontend`

3. **Configure Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - Note the URL (e.g., `https://your-app.vercel.app`)

### Option 2: Netlify

1. **Create a Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set the root directory to `frontend`

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Set Environment Variables**
   - Go to "Site settings" → "Environment variables"
   - Add the same environment variable as above

5. **Deploy**
   - Netlify will automatically deploy
   - Note the generated URL

## 🗄️ MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Choose "Shared" → "M0 Free"
   - Select your preferred cloud provider and region
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create a username and password
   - Set privileges to "Read and write to any database"

4. **Set Up Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add specific IP addresses for production

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## 🔧 Environment Variables Reference

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp?retryWrites=true&w=majority
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🧪 Testing Your Deployment

1. **Test Backend**
   ```bash
   curl https://your-backend-url.onrender.com/health
   ```
   Should return: `{"status":"OK","message":"WhatsApp Chat API is running"}`

2. **Test Frontend**
   - Open your frontend URL
   - Check if conversations load
   - Try sending a message

3. **Test API Endpoints**
   ```bash
   # Get conversations
   curl https://your-backend-url.onrender.com/api/conversations
   
   # Get messages for a specific conversation
   curl https://your-backend-url.onrender.com/api/messages/919937320320
   ```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `CORS_ORIGIN` is set correctly in backend
   - Include the full frontend URL (with https://)

2. **MongoDB Connection Issues**
   - Verify your connection string
   - Check if IP is whitelisted in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Build Failures**
   - Check if all dependencies are in package.json
   - Verify Node.js version compatibility
   - Check build logs for specific errors

4. **Environment Variables Not Working**
   - Ensure variables are set in the correct service
   - Check variable names (case-sensitive)
   - Redeploy after adding new variables

### Debug Commands

```bash
# Test backend locally
cd backend
npm run dev

# Test frontend locally
cd frontend
npm run dev

# Test MongoDB connection
cd backend
node test.js
```

## 📱 Final Steps

1. **Update CORS Origin**
   - After deploying frontend, update backend's `CORS_ORIGIN` to your frontend URL

2. **Import Sample Data**
   - Run the import script on your deployed backend:
   ```bash
   curl -X POST https://your-backend-url.onrender.com/api/import
   ```

3. **Test End-to-End**
   - Open frontend URL
   - Verify conversations load
   - Send a test message
   - Check if it appears in the chat

## 🎉 Success!

Your WhatsApp Chat Application is now deployed and ready to use! 

- **Frontend URL**: `https://your-app.vercel.app`
- **Backend URL**: `https://your-app.onrender.com`
- **API Health Check**: `https://your-app.onrender.com/health`

Share these URLs with others to test your application! 🚀



