#!/bin/bash

# Run script for HunterXJobs project
# This script starts all necessary services

echo "Starting HunterXJobs services..."

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Check if Redis is running
redis-cli ping > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Starting Redis server..."
    redis-server --daemonize yes
else
    echo "Redis server is already running."
fi

# Start backend server
echo "Starting backend server..."
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
echo "Backend server started with PID: $BACKEND_PID"

# Start agent system
echo "Starting agent system..."
python -m agents.agent_system &
AGENT_PID=$!
echo "Agent system started with PID: $AGENT_PID"

echo "All services started successfully!"
echo "Press Ctrl+C to stop all services."

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $AGENT_PID; echo 'Services stopped.'; exit 0" INT
wait
