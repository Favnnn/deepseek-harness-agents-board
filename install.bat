@echo off
rem install.bat - double-click wrapper for install.ps1 (dsh-agents-board).
rem Runs the installer from THIS folder and keeps the window open.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1"
echo.
pause
