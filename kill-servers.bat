@echo off
echo Stopping HunterXJobs servers...

echo Killing process on port 3000 (Frontend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Found process: %%a
    taskkill /F /PID %%a
)

echo Killing process on port 5000 (Backend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
    echo Found process: %%a
    taskkill /F /PID %%a
)

echo All servers have been terminated. 