@echo off
REM Molly Rose Foundation - Development Server Startup Script (Windows)
REM This script starts both the Strapi backend and Next.js frontend simultaneously

echo.
echo 🚀 Starting Molly Rose Foundation Development Environment...
echo =================================================

REM Set up variables
set STRAPI_DIR=..\molly_strapi_backend
set STRAPI_FOUND=0

REM Check if Strapi directory exists
if exist "%STRAPI_DIR%" (
    set STRAPI_FOUND=1
) else (
    echo ⚠️  Strapi directory not found at %STRAPI_DIR%
    echo Looking for alternative Strapi locations...
    
    if exist ".\backend" (
        set STRAPI_DIR=.\backend
        set STRAPI_FOUND=1
    ) else if exist ".\strapi" (
        set STRAPI_DIR=.\strapi
        set STRAPI_FOUND=1
    ) else if exist "..\strapi" (
        set STRAPI_DIR=..\strapi
        set STRAPI_FOUND=1
    ) else (
        echo ❌ Could not find Strapi directory
        echo Please ensure your Strapi server is in one of these locations:
        echo   - ..\molly_strapi_backend
        echo   - .\backend
        echo   - .\strapi
        echo   - ..\strapi
        echo.
        echo Or run Strapi manually with: npm run develop
        echo Starting Next.js only...
        set STRAPI_FOUND=0
    )
)

REM Start Strapi server if found
if %STRAPI_FOUND%==1 (
    echo 📡 Starting Strapi server...
    cd /d "%STRAPI_DIR%"
    
    if not exist "package.json" (
        echo ❌ No package.json found in Strapi directory
        cd /d "%~dp0"
        set STRAPI_FOUND=0
    ) else (
        start "Strapi Server" cmd /c "npm run develop"
        echo ✅ Strapi server starting
        echo    Strapi admin: http://localhost:1337/admin
        cd /d "%~dp0"
    )
)

REM Start Next.js server
echo 🌐 Starting Next.js server...
start "Next.js Server" cmd /c "npm run dev"
echo ✅ Next.js server starting
echo    Website: http://localhost:3000

echo.
echo 🎉 Development environment ready!
echo =================================================
echo Servers running:
if %STRAPI_FOUND%==1 (
    echo   📡 Strapi Backend:  http://localhost:1337
    echo   🔧 Strapi Admin:   http://localhost:1337/admin
)
echo   🌐 Next.js Frontend: http://localhost:3000
echo.
echo Press any key to stop all servers...
pause >nul

REM Kill the servers when script ends
taskkill /f /im node.exe 2>nul
echo All servers stopped.
pause
