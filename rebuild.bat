@rem Rebulds project from scratch
@rem Usage .\rebuild.bat
@echo OFF
cls
@echo == rebuild script ==
@echo Deleting old 'node_modules'...
@echo OFF
powershell rm -recurse node_modules
@echo Running 'npm install'...
@echo OFF
npm install --silent
@echo ON
@echo Done.