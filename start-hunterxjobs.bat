@echo off
echo Starting HunterXJobs application...

echo ===================================
echo Setting up environment for HunterXJobs
echo ===================================

cd HunterXJobs_Optimized_NoVenv\hunterxjobs_setup
echo Current directory: %CD%

echo.
echo ===================================
echo Starting backend server...
echo ===================================
cd backend
start cmd /k "echo Starting backend server... && npm run dev"
cd ..

echo.
echo ===================================
echo Starting frontend server...
echo ===================================
cd frontend
start cmd /k "echo Starting frontend server... && npm run dev"
cd ..

echo.
echo ===================================
echo Servers started successfully!
echo ===================================
echo Backend running on: http://localhost:5000
echo Frontend running on: http://localhost:3000

echo.
echo Opening frontend in your default browser...
timeout /t 5
start http://localhost:3000

echo.
echo ===================================
echo If you encounter any issues:
echo ===================================
echo 1. Make sure both command windows remain open
echo 2. Check if there are any error messages in either window
echo 3. Try refreshing your browser if the page doesn't load immediately
echo 4. Refer to the TROUBLESHOOTING.md file for common issues
echo. 