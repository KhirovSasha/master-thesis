// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract LandParameters {
    struct LandArray {
        uint256 landId;
        string info;
    }

    LandArray[] public landConnections;

    function createParameter(uint256 _landId, string memory _info) public {
        LandArray memory newConnection = LandArray(_landId, _info);
        landConnections.push(newConnection);
    }

    function getConnectionCount() public view returns (uint256) {
        return landConnections.length;
    }

    function getConnection(
        uint256 index
    ) public view returns (LandArray memory) {
        require(index < landConnections.length, "Index out of bounds");
        return landConnections[index];
    }

    function getAllObjectsByLandId(
        uint256 _landId
    ) public view returns (LandArray[] memory) {
        LandArray[] memory filteredObjects = new LandArray[](
            landConnections.length
        );

        uint256 count = 0;

        for (uint256 i = 0; i < landConnections.length; i++) {
            if (landConnections[i].landId == _landId) {
                filteredObjects[count] = landConnections[i];
                count++;
            }
        }

        assembly {
            mstore(filteredObjects, count)
        }

        return filteredObjects;
    }
}
