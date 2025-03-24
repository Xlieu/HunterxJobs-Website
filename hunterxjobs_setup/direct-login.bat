@echo off
echo Opening direct login URL for developer account...
echo.
echo Developer account credentials:
echo Email: dev@hunterxjobs.com
echo Password: dev123456
echo.
echo This URL bypasses normal login using a pre-generated JWT token.
echo.

start "" "http://localhost:3000/dashboard?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGRkOTFhZmYzMTU3YTFiN2I3MWNhNyIsInJvbGUiOiJkZXZlbG9wZXIiLCJpYXQiOjE3NDI1OTIyODIsImV4cCI6MTc0MzE5NzA4Mn0.GRhIsQLkzCVzlpZzFtJQfRGR-DtPUZxCPedA2PIORC8&user=%7B%22id%22%3A%2267ddd91aff3157a1b7b71ca7%22%2C%22name%22%3A%22Developer%20Account%22%2C%22email%22%3A%22dev%40hunterxjobs.com%22%2C%22role%22%3A%22developer%22%7D"

echo Direct login URL opened. You should now be logged in as the developer. 