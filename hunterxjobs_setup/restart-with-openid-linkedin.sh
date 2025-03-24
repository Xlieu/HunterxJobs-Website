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
echo "Starting backend server on port 5001 with OpenID Connect LinkedIn configuration..."
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
echo "LinkedIn Authentication configured with OpenID Connect:"
echo "- Client ID: 869cznydysupnp"
echo "- Scopes: openid profile email w_member_social"
echo "- Redirect URI: http://localhost:5001/api/linkedin/callback"
echo ""
echo "Manual Token Setup:"
echo "1. Log in with developer account: xenlieu@yahoo.com / ca5xe46y42JQ!"
echo "2. Go to http://localhost:3000/linkedin-token"
echo "3. Paste your access token: AQVhwo7OtdKIoCH-enq0BS-grZESIuJlR0BVqBsfKiB4sBK5Nom0CSkrVIK8mR7JU_ulcwfq4Q6kJb5DK1E_v6O7688zMYz4CtHUH60Qf54yIiLj2xiHG7NTzu9uq4Kh3TpE-s_-ewbcS5nafWS16oIXSbt65FBCFy5MQ7Fb664xWCIPV3mMzJGviF1MfXpLlPjQ3vkm_pn3La1yC5kS0xG-isUE1-wRmRzYsNyrS3WObNNwKdGtg0UzALmtEP89EhbkWUPyvP9xdaostst-BETpY0slTSMMFO_i8sQ-unFKLXywa8jw7ys5UTjj4B67o7rKUQjLqTRfnum4qhj5dRBn2I00Tw"
echo "4. Set expiry to: 5184000 (60 days)"
echo ""

# Wait for user to press any key
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