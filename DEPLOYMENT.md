# HunterxJobs Website Deployment Guide

This guide explains how to deploy the HunterxJobs website with both frontend and backend components.

## Architecture Overview

The HunterxJobs website consists of two main components:

1. **Frontend**: A Next.js application deployed on GitHub Pages
2. **Backend**: An Express.js API deployed on a cloud service (Render, Heroku, etc.)

## Frontend Deployment (GitHub Pages)

The frontend is automatically deployed through GitHub Actions whenever changes are pushed to the main branch.

### How it works:

1. GitHub Actions workflow (.github/workflows/deploy.yml) triggers on pushes to main/master branches
2. The workflow builds the Next.js application with static export
3. The static files are deployed to GitHub Pages
4. The frontend is configured to use mock data when deployed on GitHub Pages

### Frontend URL:
`https://xlieu.github.io/HunterxJobs-Website/`

## Backend Deployment (Render/Heroku)

The backend can be deployed to a cloud service like Render or Heroku.

### Deployment to Render:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `HunterXJobs_Optimized_NoVenv/hunterxjobs_setup/backend`

4. Set the following environment variables:
   - NODE_ENV: production
   - PORT: 5000
   - JWT_SECRET: (generate a secure random string)
   - JWT_EXPIRATION: 24h
   - USE_MOCK_DATA: true (or false if using a real database)
   - FRONTEND_URL: https://xlieu.github.io/HunterxJobs-Website

### Backend URL:
When deployed, your backend URL will be something like:
`https://hunterxjobs-api.onrender.com`

## Connecting Frontend to Backend

The frontend is configured to connect to the backend API automatically:

1. In development, it uses localhost:5000
2. In production on GitHub Pages, it's configured to use the deployed backend URL

If you need to change the backend URL:

1. Update the GitHub Actions workflow (.github/workflows/deploy.yml):
   ```yaml
   - name: Build with Next.js
     run: |
       cd HunterXJobs_Optimized_NoVenv/hunterxjobs_setup/frontend
       echo "NEXT_PUBLIC_API_URL=https://your-backend-url.com" > .env.production
       npm run build
   ```

## Development Setup

For local development:

1. Clone the repository
2. Install dependencies:
   ```
   cd HunterXJobs_Optimized_NoVenv/hunterxjobs_setup/backend
   npm install
   cd ../frontend
   npm install
   ```
3. Start the backend:
   ```
   cd ../backend
   npm run dev
   ```
4. Start the frontend:
   ```
   cd ../frontend
   npm run dev
   ```
5. Access the application at `http://localhost:3000`

## Troubleshooting

### Frontend Issues:
- Check browser console for errors
- Verify the frontend is correctly connecting to the backend API
- Check GitHub Actions logs for build issues

### Backend Issues:
- Check server logs on your cloud provider
- Verify environment variables are set correctly
- Ensure CORS is properly configured to allow requests from GitHub Pages

## Mock Data Mode

When using mock data mode (USE_MOCK_DATA=true):
- The application operates without a database
- All API endpoints return predefined mock data
- User authentication is simulated

This is useful for demonstration purposes or when you don't want to set up a full database.

## Vercel Configuration

To deploy to Vercel, you need to create a Vercel configuration file at the root of your backend directory:

```
{
  "version": 2,
  "builds": [
    {
      "src": "hunterxjobs_setup/backend/src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "hunterxjobs_setup/backend/src/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "USE_MOCK_DATA": "true",
    "JWT_SECRET": "56bdfb8d7a6ec785537bb3b028d49e25d94feee766024d617d4e5534e4c0ab30",
    "JWT_EXPIRATION": "24h",
    "FRONTEND_URL": "https://xlieu.github.io/HunterxJobs-Website"
  }
} 