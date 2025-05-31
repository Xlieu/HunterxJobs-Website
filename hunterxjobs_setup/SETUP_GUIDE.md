# HunterXJobs Project Setup Guide for Visual Studio Code

This guide will walk you through setting up and running the HunterXJobs project in Visual Studio Code.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Visual Studio Code**: [Download here](https://code.visualstudio.com/download)
2. **Python 3.11**: [Download here](https://www.python.org/downloads/)
3. **Node.js 16+**: [Download here](https://nodejs.org/en/download/)
4. **PostgreSQL 16**: [Download here](https://www.postgresql.org/download/)
5. **Redis 7.0**: [Download here](https://redis.io/download)
6. **Git**: [Download here](https://git-scm.com/downloads)

## Step 1: Extract the Project Files

1. Extract the provided ZIP file to a location of your choice
2. The extracted folder should contain the complete HunterXJobs project structure

## Step 2: Open the Project in Visual Studio Code

1. Open Visual Studio Code
2. Go to File > Open Folder
3. Navigate to the extracted HunterXJobs folder and select it
4. Click "Open"

## Step 3: Install Recommended Extensions

Visual Studio Code will automatically detect the recommended extensions for this project:

1. When prompted, click "Install All" to install the recommended extensions
2. Alternatively, you can manually install them from the Extensions view (Ctrl+Shift+X)

The recommended extensions include:
- Python extension
- Pylance
- Flake8
- Black Formatter
- Prettier
- ESLint
- Tailwind CSS IntelliSense
- Docker
- YAML
- DotENV
- GitLens
- TypeScript
- Remote Containers

## Step 4: Set Up Python Environment

1. Open a terminal in VS Code (Terminal > New Terminal)
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```bash
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

## Step 5: Configure Environment Variables

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and update the values with your specific configuration:
   - Database credentials
   - Redis connection details
   - Security keys
   - LinkedIn API credentials

## Step 6: Set Up the Database

1. Create a PostgreSQL database for the project:
   ```bash
   createdb hunterxjobs
   ```
2. Create a database user:
   ```bash
   createuser -P hunterxjobs_user
   ```
   (Enter a password when prompted)
3. Grant privileges to the user:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE hunterxjobs TO hunterxjobs_user;
   ```

## Step 7: Start Redis Server

1. Start the Redis server:
   ```bash
   redis-server
   ```

## Step 8: Run the Backend

1. In VS Code, press F5 or use the Run and Debug view
2. Select "Python: FastAPI" from the dropdown menu
3. Click the green play button to start the backend server
4. The API will be available at http://localhost:8000

## Step 9: Run the Frontend

1. Open a new terminal in VS Code
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install the required Node.js packages:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The frontend will be available at http://localhost:3000

## Step 10: Run the Agent System

1. Open a new terminal in VS Code
2. Ensure your virtual environment is activated
3. Run the agent system:
   ```bash
   python -m agents.agent_system
   ```
   Alternatively, you can use the "Python: Agent System" launch configuration.

## Project Structure Overview

- **agents/**: Contains the AI agent system
  - **base/**: Base agent classes and communication protocols
  - **project_manager/**: Project Manager Agent implementation
  - **programmer/**: Programmer Agent implementation
  - **debugger/**: Debugger Agent implementation
  - **linkedin_optimizer/**: LinkedIn Profile Optimizer Agent implementation
  - **security/**: Security Agent implementation
- **backend/**: FastAPI backend implementation
- **frontend/**: Next.js frontend implementation
- **config/**: Configuration files
- **docs/**: Project documentation
- **tests/**: Test files
- **nginx/**: Nginx configuration for deployment

## Debugging

- Use the provided launch configurations in VS Code for debugging
- Set breakpoints by clicking in the gutter next to line numbers
- Use the Debug Console to inspect variables and execute code

## Troubleshooting

1. **Database Connection Issues**:
   - Verify PostgreSQL is running
   - Check database credentials in the `.env` file
   - Ensure the database and user exist with proper permissions

2. **Redis Connection Issues**:
   - Verify Redis server is running
   - Check Redis connection details in the `.env` file

3. **Python Package Issues**:
   - Ensure you're using Python 3.11
   - Verify the virtual environment is activated
   - Try reinstalling packages: `pip install -r requirements.txt --force-reinstall`

4. **Frontend Issues**:
   - Verify Node.js version is 16+
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Next Steps

After setting up the project, you can:

1. Explore the agent architecture in `docs/agent_architecture.md`
2. Review the project requirements in `docs/project_requirements.md`
3. Modify the configuration in `config/config.json` to customize the system behavior
4. Run tests to verify functionality: `pytest tests/`

## Additional Resources

- FastAPI Documentation: https://fastapi.tiangolo.com/
- Next.js Documentation: https://nextjs.org/docs
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Redis Documentation: https://redis.io/documentation
- LinkedIn API Documentation: https://docs.microsoft.com/en-us/linkedin/
