@echo off
echo Opening direct login URL for developer account...
echo.
echo Developer account credentials:
echo Email: admin@test.com
echo Password: admin123
echo.
echo This URL bypasses normal login using a pre-generated JWT token.
echo.

start "" "http://localhost:3000/dashboard?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGRkZDMxNWUxOGY1YzhkM2YwYmE0NiIsInJvbGUiOiJkZXZlbG9wZXIiLCJpYXQiOjE3NDI1OTMyODksImV4cCI6MTc0MzE5ODA4OX0.3oK4X1YAkpFoXXQyj5KTsEr4uLZ1LKTN_W2HMQDrNx8&user=%7B%22id%22%3A%2267dddd315e18f5c8d3f0ba46%22%2C%22name%22%3A%22Admin%20Test%22%2C%22email%22%3A%22admin%40test.com%22%2C%22role%22%3A%22developer%22%7D"

echo Direct login URL opened. You should now be logged in as the developer.