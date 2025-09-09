@echo off
echo Starting Jobify Development Environment...
echo.

echo Starting MongoDB (if not already running)...
echo Please make sure MongoDB is installed and running on your system.
echo.

echo Starting Server...
start "Jobify Server" cmd /k "cd server && npm start"
timeout /t 3 /nobreak > nul

echo Starting Client...
start "Jobify Client" cmd /k "cd client && npm start"
timeout /t 2 /nobreak > nul

echo.
echo Both server and client should now be starting...
echo Server: http://localhost:5000
echo Client: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
