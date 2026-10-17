@echo off
REM == MuMuAINovel - khoi dong backend (SQLite, local) ==
cd /d "%~dp0backend"
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
echo Dang khoi dong MuMuAINovel tai http://127.0.0.1:8000 ...
.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
