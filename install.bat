@echo off 
call npm install -g typescript ts-node ts-node-dev

:: Create array with values API, Client, Database, Routine
set installPackages=API Client Database Routine
set Compilate=API Client Routine

:: Loop through array
for %%f in (%installPackages%) do (
    echo Installing %%f
    cd %%f
    npm install
    cd ..
)

:: Loop through array
for %%f in (%Compilate%) do (
    echo Compilating %%f
    cd %%f
    npx tsc
    cd ..
)