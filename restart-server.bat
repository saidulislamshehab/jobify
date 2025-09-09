@echo off
echo Stopping any existing server processes...
taskkill /f /im node.exe 2>nul

echo Starting server with updated configuration...
cd server
npm start
