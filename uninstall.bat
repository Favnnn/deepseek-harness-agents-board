@echo off
rem uninstall.bat - double-click wrapper for uninstall.ps1 (dsh-agents-board).
rem Removes the managed row, the installed copy and the settings section.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0uninstall.ps1"
echo.
pause
