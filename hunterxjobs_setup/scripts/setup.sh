#!/bin/bash

# Setup script for HunterXJobs project
# This script automates the initial setup process

echo "Starting HunterXJobs project setup..."

# Create virtual environment
echo "Creating Python virtual environment..."
python -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file
echo "Creating .env file from template..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env file created. Please update it with your configuration."
else
    echo ".env file already exists."
fi

# Check if PostgreSQL is installed
if command -v psql &> /dev/null; then
    echo "PostgreSQL is installed."
    echo "Please create the database manually with:"
    echo "  createdb hunterxjobs"
    echo "  createuser -P hunterxjobs_user"
    echo "  psql -c 'GRANT ALL PRIVILEGES ON DATABASE hunterxjobs TO hunterxjobs_user;'"
else
    echo "PostgreSQL is not installed. Please install it before continuing."
fi

# Check if Redis is installed
if command -v redis-server &> /dev/null; then
    echo "Redis is installed."
else
    echo "Redis is not installed. Please install it before continuing."
fi

echo "Setup completed!"
echo "Please refer to SETUP_GUIDE.md for detailed instructions on running the project."
