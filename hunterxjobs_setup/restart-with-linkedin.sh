#!/bin/bash

# Kill processes on ports
echo "Killing processes on ports 5001 and 3000..."
cd backend
node src/scripts/kill-port.js 5001
cd ../frontend
node ../backend/src/scripts/kill-port.js 3000

# Reset the developer password
echo "Resetting developer account..."
cd ../backend
node src/scripts/reset-developer-password.js

# Start backend server
echo "Starting backend server on port 5001 with real LinkedIn credentials..."
cd ../backend
node src/server.js > backend.log 2>&1 &
backendPID=$!
echo "Backend server started with PID: $backendPID"
echo "Backend logs available at: backend.log"

# Wait 2 seconds to let the backend start
sleep 2

# Start frontend server
echo "Starting frontend server on port 3000..."
cd ../frontend
npm run dev > frontend.log 2>&1 &
frontendPID=$!
echo "Frontend server started with PID: $frontendPID"
echo "Frontend logs available at: frontend.log"

echo "Both servers started successfully!"
echo "Backend running on: http://localhost:5001"
echo "Frontend running on: http://localhost:3000"
echo ""
echo "LinkedIn Authentication configured with:"
echo "- Client ID: 869cznydysupnp"
echo "- Redirect URI: http://localhost:5001/api/linkedin/callback"
echo ""
echo "Developer account: xenlieu@yahoo.com / ca5xe46y42JQ!"

# Wait for user to press any key
echo ""
echo "Press any key to open the application in your browser..."
read -n 1

# Open the browser
echo "Opening browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  open http://localhost:3000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux
  xdg-open http://localhost:3000
else
  # Windows
  start http://localhost:3000
fi 