// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract LandParameters {
   struct LandArray {
        uint256 landId;
        string info; 
    }

    LandArray[] public landConnections;

    function createConnection(uint256 _landId, string memory _info) public {
        LandArray memory newConnection = LandArray(_landId, _info);
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
