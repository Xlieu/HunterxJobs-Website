@echo off
echo Killing process on port 3000...
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :3000') DO (
  echo Found process: %%P
  taskkill /PID %%P /F
  echo Process killed
)

echo Killing process on port 5001...
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr :5001') DO (
  echo Found process: %%P
  taskkill /PID %%P /F
  echo Process killed
)

echo Done.
echo You can now restart your servers. 