# Troubleshooting Guide

This document covers common issues you might encounter when running the HunterXJobs platform and how to fix them.

## Port Already in Use

**Symptom:** You see an error like `EADDRINUSE: address already in use :::5001` when starting the backend server.

**Solution:**
1. Run the kill-port script to free up the port:
   ```bash
   cd backend
   node src/scripts/kill-port.js 5001
   ```

2. If that doesn't work, find and manually kill the process:
   - Windows: `netstat -ano | findstr :5001` then `taskkill /F /PID <PID>`
   - Mac/Linux: `lsof -i :5001` then `kill -9 <PID>`

## LinkedIn Authentication Fails

**Symptom:** You see "The passed in client_id is invalid" when trying to connect with LinkedIn.

**Solution:**
1. Check your `.env` file in the backend folder and make sure you have valid LinkedIn API credentials
2. Make sure the redirect URI in your LinkedIn app settings matches exactly with what's in your `.env` file
3. Restart the backend server after updating credentials

## Developer Account Login Issues

**Symptom:** The developer account password doesn't work or keeps changing.

**Solution:**
1. Reset the developer password to a known working value:
   ```bash
   cd backend
   node src/scripts/reset-developer-password.js
   ```
   
2. Use the credentials output by the script to log in

## Dashboard Gets Stuck Loading

**Symptom:** After logging in, the dashboard page keeps spinning without loading.

**Solution:**
1. Check browser console for errors
2. Make sure both frontend and backend servers are running
3. Verify that the ports match in your `.env` files
4. Clear your browser cache and localStorage:
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Storage (localStorage, sessionStorage, etc.)
   - Try logging in again

## Frontend Compilation Errors

**Symptom:** You see React or TypeScript errors in the terminal when running the frontend.

**Solution:**
1. Make sure you have the correct dependencies installed:
   ```bash
   cd frontend
   npm install
   ```
2. Check for syntax errors in your code
3. If using VS Code or another IDE, check for linting errors

## API Requests Not Working

**Symptom:** API requests from the frontend to the backend fail.

**Solution:**
1. Make sure both servers are running
2. Check if the backend URL in the frontend `.env.local` file matches your actual backend server
3. Look for CORS errors in the browser console
4. Verify the JWT token is being sent correctly with each request

## Session Expires Too Quickly

**Symptom:** You get logged out frequently.

**Solution:**
1. Check the `JWT_EXPIRATION` value in your backend `.env` file
2. Increase the value if needed (e.g., from 1h to 24h)

## General Troubleshooting Steps

1. **Check logs:** Look for error messages in the terminal where your servers are running
2. **Restart servers:** Sometimes a simple restart fixes many issues
3. **Clear cache:** Clear browser cache and cookies
4. **Check configuration:** Verify all environment variables are set correctly
5. **Check dependencies:** Make sure all required packages are installed
6. **Check port conflicts:** Make sure nothing else is using your ports

## Getting Help

If you're still having issues after trying these solutions, please file an issue with:
- Detailed description of the problem
- Steps to reproduce
- Error messages from the console
- Your environment information (OS, Node.js version, etc.) 