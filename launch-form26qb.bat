@echo off
REM Form 26QB Application Launcher
REM This script starts the dev server and opens the browser

echo ========================================
echo   Starting Form 26QB Application...
echo ========================================
echo.

REM Navigate to project directory
cd /d "C:\Users\arjus\.gemini\antigravity\scratch\form-26qb-app"

echo Starting development server...
echo.

REM Start the dev server and open browser
start "" http://localhost:5173
timeout /t 2 /nobreak >nul

REM Run npm dev server
npm run dev

REM Keep window open if there's an error
pause
