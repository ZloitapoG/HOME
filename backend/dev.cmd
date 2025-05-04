@echo off
:loop
tsx ./src/index.ts
if %errorlevel% neq 0 exit /b
goto loop