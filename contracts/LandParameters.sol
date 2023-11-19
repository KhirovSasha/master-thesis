// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


// This is the main building block for smart contracts.
contract LandParameters {
   struct LandArray {
        uint256 landId1;
        uint256 landId2;
        string connectionInfo; // Adding a string parameter
        // Add more parameters as needed
    }

    LandArray[] public landConnections;

    function createConnection(uint256 _landId1, uint256 _landId2, string memory _connectionInfo) public {
        // You may want to add additional validation logic here
        LandArray memory newConnection = LandArray(_landId1, _landId2, _connectionInfo);
        landConnections.push(newConnection);
    }

    function getConnectionCount() public view returns (uint256) {
        return landConnections.length;
    }

    function getConnection(uint256 index) public view returns (LandArray memory) {
        require(index < landConnections.length, "Index out of bounds");
        return landConnections[index];
    }

}
