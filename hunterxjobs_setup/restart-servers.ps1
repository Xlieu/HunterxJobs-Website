# PowerShell script to restart both servers

# Kill any existing node processes
Write-Host "Stopping any existing node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Start backend server in a new window
Write-Host "Starting backend server on port 5001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; node src/server.js"

# Wait 2 seconds to let the backend start
Start-Sleep -Seconds 2

# Start frontend server in a new window
Write-Host "Starting frontend server on port 3001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

# Open the browser
Write-Host "Opening browser..." -ForegroundColor Green
Start-Sleep -Seconds 3
Start-Process "http://localhost:3001"

Write-Host "Both servers started successfully!" -ForegroundColor Cyan
Write-Host "Backend running on: http://localhost:5001" -ForegroundColor Cyan
Write-Host "Frontend running on: http://localhost:3001" -ForegroundColor Cyan 