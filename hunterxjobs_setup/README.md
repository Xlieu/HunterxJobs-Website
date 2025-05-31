# HunterXJobs

AI-Powered Career Catalyst - Transform Your LinkedIn Presence into Opportunity Magnetism

## Overview

HunterXJobs is a comprehensive platform that uses AI to analyze and optimize LinkedIn profiles, generate career-focused content, and provide professional development insights. The platform features a multi-agent AI system that works together to deliver highly personalized career optimization.

## Features

- **LinkedIn Profile Analysis**: Deep profile assessment across 78 dimensions
- **Content Generator**: AI-powered professional content creation
- **Programmer Agent**: Generate code based on requirements (Developer access only)
- **Direct Authentication**: OAuth integration with LinkedIn

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/hunterxjobs
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=7d
PORT=5001
FRONTEND_URL=http://localhost:3000
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_CALLBACK_URL=http://localhost:5001/api/linkedin/callback
```

### Running the Application

#### Using Batch Files (Windows)

Several batch files are included to help with development:

- `restart-servers.bat` - Starts both backend and frontend servers
- `kill-ports.bat` - Kills processes on ports 3000 and 5001
- `direct-login.bat` - Opens a direct login URL for developer access

#### Manual Start

```bash
# Start backend
cd backend
npm run dev

# Start frontend (in another terminal)
cd frontend
npm run dev
```

### Account Credentials

#### Developer Account

If you encounter login issues with the default developer account, use the direct login option:

1. Run the backend server
2. Run `direct-login.bat` or navigate to the URL it contains
3. You'll be automatically logged in as a developer

#### Alternative Login Options

1. **Direct Developer Account**:
   - Email: `dev@hunterxjobs.com`
   - Password: `dev123456`

2. **Default Developer Account** (may have bcrypt compatibility issues):
   - Email: `xenlieu@yahoo.com`
   - Password: `ca5xe46y42JQ!`

3. **Creating Your Own Account**:
   - Run the script: `cd backend && node src/scripts/create-user.js`
   - Edit the script first to set your desired credentials

## Technical Architecture

The application uses a Next.js frontend and Express.js backend with MongoDB. The agent system is built on a hierarchy of specialized AI agents managed by a central service.

### Frontend

- Next.js
- React
- Tailwind CSS
- Formik (form handling)

### Backend

- Express.js
- MongoDB with Mongoose
- JSON Web Tokens for authentication
- LinkedIn OAuth integration

## Troubleshooting

If you encounter login issues:

1. Try the direct login option using `direct-login.bat`
2. Create a new developer account using `node src/scripts/create-developer.js`
3. Reset the default developer password with `node src/scripts/reset-developer-password.js`

For profile analysis issues:

1. Check that both servers are running properly
2. Look at the detailed logs in the browser console and backend terminal
3. Make sure MongoDB is running and accessible

## License

Copyright © 2024 HunterXJobs
