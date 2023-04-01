#!/bin/bash

npm install -g typescript ts-node ts-node-dev

# Create array with values API, Client, Database, Routine
declare -a installPackages=("API" "Client" "Database" "Routine")
declare -a Compilate=("API" "Client" "Routine")

# Loop through array values
for i in "${installPackages[@]}"
do
   echo "Installing $i dependencies"
   cd $i
   npm install
   cd ..
done

# Loop through array values
for i in "${Compilate[@]}"
do
   echo "Compilating $i"
   cd $i
   npx tsc
   cd ..
done