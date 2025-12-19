@echo off
REM Form 26QB GitHub Deployment Script
REM This script automates git initialization, commits, and deployment to GitHub Pages

set PROJECT_DIR=C:\Users\arjus\.gemini\antigravity\scratch\form-26qb-app
set REPO_URL=https://github.com/arjusmailbox-dotcom/form-26qb-app.git
set NPM_CMD="C:\Program Files\nodejs\npm.cmd"

echo ========================================
echo   Deploying Form 26QB to GitHub Pages
echo ========================================
echo.

cd /d "%PROJECT_DIR%"

REM Check if Git is installed
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Git is not installed or not in your PATH.
    echo Please download and install Git from: https://git-scm.com/download/win
    echo After installing, restart this window and try again.
    echo.
    pause
    exit /b
)

REM Configure Git Identity if missing
git config --global user.email >nul 2>&1
if %errorlevel% neq 0 (
    echo Configuring Git email...
    git config --global user.email "arjusmailbox@gmail.com"
)
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo Configuring Git name...
    git config --global user.name "Arjus"
)

REM Initialize Git if needed
if not exist .git (
    echo Initializing Git repository...
    git init
    git remote add origin %REPO_URL%
) else (
    echo Git already initialized. Checking remote...
    git remote remove origin >nul 2>&1
    git remote add origin %REPO_URL%
)

echo.
echo Stage 1: Staging files...
git add .

echo.
echo Stage 2: Committing changes...
git commit -m "Auto-deploy to GitHub Pages"

echo.
echo Stage 3: Building and Deploying...
echo This may take a minute...
echo.

REM Using 'call' to ensure the script continues after npm finishes
call %NPM_CMD% run deploy

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo.
echo   Your site will be live at:
echo   https://arjusmailbox-dotcom.github.io/form-26qb-app/
echo.
echo   (Note: It may take 1-2 minutes for GitHub to refresh)
echo ========================================
echo.
pause
