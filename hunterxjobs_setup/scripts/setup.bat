@echo off
REM Setup script for HunterXJobs project on Windows
REM This script automates the initial setup process

echo Starting HunterXJobs project setup...

REM Create virtual environment
echo Creating Python virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Create .env file
echo Creating .env file from template...
if not exist .env (
    copy .env.example .env
    echo .env file created. Please update it with your configuration.
) else (
    echo .env file already exists.
)

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo PostgreSQL is installed.
    echo Please create the database manually with:
    echo   createdb hunterxjobs
    echo   createuser -P hunterxjobs_user
    echo   psql -c "GRANT ALL PRIVILEGES ON DATABASE hunterxjobs TO hunterxjobs_user;"
) else (
    echo PostgreSQL is not installed. Please install it before continuing.
)

REM Check if Redis is installed
where redis-server >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo Redis is installed.
) else (
    echo Redis is not installed. Please install it before continuing.
)

echo Setup completed!
echo Please refer to SETUP_GUIDE.md for detailed instructions on running the project.
pause
