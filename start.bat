@echo off

REM Start the first terminal and run 'npx hardhat node'
start cmd /k "npx hardhat node"

REM Wait for a few seconds to ensure the node has started (you can adjust the timeout as needed)
timeout /t 10

REM Open a new terminal and run 'npx hardhat --network localhost run scripts/deploy.js'
start cmd /k "npx hardhat --network localhost run scripts/deploy.js"

REM Change directory to 'frontend' and run 'npm run start' in the current terminal
cd frontend
npm run start
