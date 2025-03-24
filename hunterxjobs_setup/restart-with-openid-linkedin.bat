@echo off
echo ================================================
echo Starting HunterXJobs with LinkedIn OpenID Connect
echo ================================================

echo.
echo Killing processes on ports 3000 and 5001...
call .\kill-ports.bat

echo.
echo Setting up dev password...
echo "dev_password=DEV_PASSWORD_12345!" > .env

echo.
echo Starting backend server...
cd backend
start cmd /k "echo Starting backend server on port 5001... && npm run dev > ..\backend.log 2>&1"
cd ..

echo.
echo Starting frontend server...
cd frontend
start cmd /k "echo Starting frontend server on port 3000... && npm run dev > ..\frontend.log 2>&1"
cd ..

echo.
echo ====== LinkedIn Authentication Details ======
echo.
echo Client ID:     86cppbkeipazbr
echo Scopes:        openid profile email
echo Redirect URI:  http://localhost:5001/api/linkedin/callback
echo.
echo ====== Manual Token Setup ======
echo.
echo Access Token:  AQUZUv2eh-M9x9Lm1J3bnfSA2Tr_lSvg9xgC9tZ-FO7c_yHUY-qeGsgM-FH5Bqn8G9Xj_VRcOfphkJphmkVrExcwOjsqfPU4vZBqOl-qD-K7Ise5oZY2IXsrMDnp8hHWdUlP3L6WRe0nO1FpAV-3Z_LO-MvCkJNcJZIzFbKkiJ18uc9zr-QKDx4vIw
echo Expires In:    5184000 seconds (60 days)
echo.

echo Opening application in browser...
timeout /t 5 > nul
start http://localhost:3000/dashboard

echo.
echo Servers started successfully! Check backend.log and frontend.log for details.
echo. 