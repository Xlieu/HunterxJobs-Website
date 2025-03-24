@echo off
echo Starting HunterXJobs servers...

echo Killing any processes on ports 3000 and 5001...
call .\kill-ports.bat

echo.
echo Setting up developer account...
echo.
echo Note: If you encounter login issues with the developer account,
echo try running the reset-developer-password.js script manually:
echo cd backend && node src\scripts\reset-developer-password.js
echo.

echo.
echo Starting backend server...
cd backend
start cmd /k "npm run dev"
cd ..

echo.
echo Starting frontend server...
cd frontend
start cmd /k "npm run dev"
cd ..

echo.
echo Servers started successfully!
echo Backend running on: http://localhost:5001
echo Frontend running on: http://localhost:3000

echo.
echo Use these credentials to log in as a developer:
echo Email: xenlieu@yahoo.com
echo Password: ca5xe46y42JQ!

timeout /t 5
start http://localhost:3000/login 