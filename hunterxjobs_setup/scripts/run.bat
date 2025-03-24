@echo off
REM Run script for HunterXJobs project on Windows
REM This script starts all necessary services

echo Starting HunterXJobs services...

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Check if Redis is running
redis-cli ping >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Starting Redis server...
    start /B redis-server
    timeout /t 2 >nul
) else (
    echo Redis server is already running.
)

REM Start backend server
echo Starting backend server...
start /B cmd /c "uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"
echo Backend server started.

REM Start agent system
echo Starting agent system...
start /B cmd /c "python -m agents.agent_system"
echo Agent system started.

echo All services started successfully!
echo Press Ctrl+C in each terminal window to stop the services.
echo Or close all terminal windows to stop all services.
pause
