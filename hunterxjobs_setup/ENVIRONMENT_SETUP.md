# Environment Setup Guide

This document provides instructions for setting up the environment variables needed for the HunterxJobs application.

## Environment Files

The application uses several environment files that are not included in the repository for security reasons:

1. `/.env` - Root environment file
2. `/backend/.env` - Backend environment file
3. `/frontend/.env.local` - Frontend environment file

## Setup Instructions

### 1. Root Environment Setup

Copy the example file to create your own environment file:

```bash
cp .env.example .env
```

Then, edit the `.env` file and update the following values:

- `DB_PASSWORD`: Set a secure database password
- `SECRET_KEY`: Generate a random secure key
- `JWT_SECRET`: Generate a random secure key
- `LINKEDIN_CLIENT_ID`: Your LinkedIn API client ID
- `LINKEDIN_CLIENT_SECRET`: Your LinkedIn API client secret

### 2. Backend Environment Setup

Copy the example file to create your own environment file:

```bash
cd backend
cp .env.example .env
```

Then, edit the `.env` file and update the following values:

- `JWT_SECRET`: Generate a random secure key (use the same value as in the root .env)
- `LINKEDIN_CLIENT_ID`: Your LinkedIn API client ID
- `LINKEDIN_CLIENT_SECRET`: Your LinkedIn API client secret

### 3. Frontend Environment Setup

Copy the example file to create your own environment file:

```bash
cd frontend
cp .env.example .env.local
```

No changes are typically required for the frontend environment file unless you're running the backend on a different port or host.

## Generating Secure Keys

You can generate secure random keys with the following command:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## LinkedIn API Setup

To obtain LinkedIn API credentials:

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Create a new application
3. Set the redirect URL to match your `LINKEDIN_REDIRECT_URI` in the environment files
4. Copy the Client ID and Client Secret to your environment files

## Testing Your Configuration

After setting up your environment files, you can verify they're working correctly by:

1. Starting the backend server: `cd backend && npm run dev`
2. Starting the frontend server: `cd frontend && npm run dev`
3. Visiting http://localhost:3000 in your browser

## Security Notes

- Never commit your environment files to the repository
- Keep your API keys and secrets secure
- Rotate secrets regularly in production environments
- Use different keys for development and production environments 