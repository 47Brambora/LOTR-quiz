@echo off
echo Starting offline version LOTR-quiz...

:: Spouštění local serveru na portu 8000
start "" /min mongoose.exe

:: čekat 2 sekundy, aby se stihl spustit server
timeout /t 2 >nul

::otevření webu
start "" http://localhost:8000/index.html

exit