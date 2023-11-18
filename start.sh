#!/bin/bash

# Start the first terminal and run 'npx hardhat node'
gnome-terminal --tab --title="Hardhat Node" -- bash -c "npx hardhat node; exec bash"

# Wait for a few seconds to ensure the node has started (you can adjust the sleep duration as needed)
sleep 5

# Open a new terminal and run 'npx hardhat --network localhost run scripts/deploy.js'
gnome-terminal --tab --title="Hardhat Deploy" -- bash -c "npx hardhat --network localhost run scripts/deploy.js; exec bash"

# Change directory to 'frontend' and run 'npm run start' in the current terminal
cd frontend
npm run start
