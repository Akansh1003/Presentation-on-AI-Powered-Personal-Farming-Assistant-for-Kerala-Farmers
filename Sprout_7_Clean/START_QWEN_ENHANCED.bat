@echo off
REM ================================================
REM 🌾 KRISHI SAKHI - AI FARMING ASSISTANT LAUNCHER
REM ================================================
REM
REM 📋 PURPOSE:
REM This Windows batch script automates the startup process for
REM Krishi Sakhi, the AI-powered farming assistant for Kerala.
REM It handles dependency installation, system checks, and launches
REM both backend and frontend servers.
REM
REM 🔧 WHAT THIS SCRIPT DOES:
REM - Verifies Python installation (3.8+ required)
REM - Installs/updates required Python packages automatically
REM - Creates necessary directory structure
REM - Launches Flask backend server with AI model loading
REM - Starts simple HTTP server for frontend
REM - Provides system status and usage information
REM
REM 🚀 SYSTEM REQUIREMENTS:
REM - Windows 10/11
REM - Python 3.8 or higher installed and in PATH
REM - Internet connection for package installation
REM - 4GB+ RAM (8GB recommended)
REM - 2GB+ free disk space
REM
REM 🌐 SERVERS LAUNCHED:
REM - Backend API: http://localhost:5000 (Flask + AI models)
REM - Frontend UI: http://localhost:8000 (Static file server)
REM
REM ⚡ PERFORMANCE FEATURES:
REM - Lightweight AI models (DialoGPT-medium, DistilGPT-2)
REM - Fast startup with intelligent fallback systems
REM - Memory-optimized for systems with limited RAM
REM - Production-ready error handling
REM
REM 📞 USAGE:
REM 1. Double-click this .bat file
REM 2. Wait for servers to start (30 seconds - 2 minutes)
REM 3. Open browser to http://localhost:8000
REM 4. Start chatting with the AI farming assistant
REM 5. Press Ctrl+C in server windows to stop when done
REM
REM Author: AI Development Team
REM Version: 2.0.0 - Production Ready
REM Last Updated: September 2025
REM ================================================

echo ========================================
echo 🚀 Krishi Sakhi Enhanced with AI 🚀
echo ========================================

:: Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ and add to PATH
    pause
    exit /b 1
)

:: Check if we're in the right directory
if not exist "backend\app_qwen_enhanced.py" (
    echo ❌ Enhanced backend file not found!
    echo Make sure you're running this from the Sprout_7_Clean directory
    pause
    exit /b 1
)

:: Install required Python packages
echo 🔄 Installing/Updating Python dependencies...
pip install flask flask-sqlalchemy flask-cors requests torch transformers accelerate

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    echo Please check your internet connection and pip installation
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.

:: Kill any existing Python processes (optional cleanup)
echo 🧹 Cleaning up any existing Python processes...
taskkill /f /im python.exe >nul 2>&1

:: Create data directories if they don't exist
if not exist "data" mkdir data
if not exist "data\sqlite" mkdir data\sqlite

:: Start the enhanced backend
echo 🌾 Starting Krishi Sakhi Enhanced AI Backend...
echo 📡 Backend will be available at http://localhost:5000
echo 🤖 Lightweight AI model (DialoGPT/DistilGPT-2) will load in background
echo.
echo ⏳ Lightweight models load quickly (30 seconds - 2 minutes)...
echo 💡 The enhanced fallback system works immediately while model loads
echo.

cd backend
start "Krishi Sakhi Enhanced Backend" python app_qwen_enhanced.py

:: Wait a moment for backend to start
timeout /t 3 >nul

:: Start the frontend server
echo 🌐 Starting Frontend Server...
echo 📱 Frontend will be available at http://localhost:8000
echo.

cd ..
start "Krishi Sakhi Frontend" python -m http.server 8000

echo.
echo 🎉 Krishi Sakhi Enhanced is starting up!
echo.
echo 📊 System Status:
echo    - Backend (Qwen AI):  http://localhost:5000
echo    - Frontend:           http://localhost:8000
echo.
echo 🤖 AI Features:
echo    - Lightweight AI models (DialoGPT/DistilGPT-2) for dynamic responses
echo    - Conversation memory (no more repetitive answers!)
echo    - Enhanced fallback system for reliability
echo    - Comprehensive Kerala farming knowledge
echo.
echo 💡 First run notes:
echo    - Lightweight model download: 30 seconds - 2 minutes
echo    - Much lower memory usage (under 2GB RAM)
echo    - System works immediately with enhanced fallback responses
echo    - Model status visible in chat interface
echo.
echo Press Ctrl+C in backend/frontend windows to stop servers
echo Close this window when done
pause