// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract LandParameters {
    struct LandArray {
        uint256 id;
        uint256 landId;
        string info;
    }

    LandArray[] public landConnections;
    uint256 private objectIdCounter = 1;

    function createParameter(uint256 _landId, string memory _info) public {
        addObject(_info, _landId);
    }

    function addObject(string memory _info, uint256 _landId) private {
        LandArray memory newObject = LandArray(objectIdCounter, _landId, _info);
        landConnections.push(newObject);
        objectIdCounter++;
    }

    function editObject(uint256 _id, string memory _info) public {
        for (uint256 i = 0; i < landConnections.length; i++) {
            if (landConnections[i].id == _id) {
                landConnections[i].info = _info;
                break;
            }
        }
    }

    function deleteObject(uint256 _id) public {
        for (uint256 i = 0; i < landConnections.length; i++) {
            if (landConnections[i].id == _id) {
                delete landConnections[i];
                break;
            }
        }
    }

    function getObjectById(uint256 _id) public view returns (LandArray memory) {
        for (uint256 i = 0; i < landConnections.length; i++) {
            if (landConnections[i].id == _id) {
                return landConnections[i];
            }
        }

        revert("Object not found");
    }

    function getConnectionCount() public view returns (uint256) {
        return landConnections.length;
    }

    function getConnection(uint256 index) public view returns (LandArray memory) {
        require(index < landConnections.length, "Index out of bounds");
        return landConnections[index];
    }

    function getAllObjectsByLandId(uint256 _landId) public view returns (LandArray[] memory) {
        LandArray[] memory filteredObjects = new LandArray[](landConnections.length);

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
