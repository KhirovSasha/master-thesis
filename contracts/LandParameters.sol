// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract LandParameters {
    struct LandArray {
        uint256 id;
        uint256 landId;
        uint256 dateTime;
        string description;
        address owner;
        // New fields
        uint256 pHLevel;
        uint256 organicMatter;
        uint256 nitrogenContent;
        uint256 phosphorusContent;
        uint256 potassiumContent;
        uint256 area;
    }

    LandArray[] public landConnections;
    uint256 private objectIdCounter = 1;

    function createParameter(
        uint256 _landId,
        string memory _description,
        uint256 _pHLevel,
        uint256 _organicMatter,
        uint256 _nitrogenContent,
        uint256 _phosphorusContent,
        uint256 _potassiumContent,
        uint256 _area
    ) public {
        addObject(
            _landId,
            _description,
            block.timestamp,
            _pHLevel,
            _organicMatter,
            _nitrogenContent,
            _phosphorusContent,
            _potassiumContent,
            _area
        );
    }

    function addObject(
        uint256 _landId,
        string memory _description,
        uint256 _timestamp,
        uint256 _pHLevel,
        uint256 _organicMatter,
        uint256 _nitrogenContent,
        uint256 _phosphorusContent,
        uint256 _potassiumContent,
        uint256 _area
    ) private {
        LandArray memory newObject = LandArray(
            objectIdCounter,
            _landId,
            _timestamp,
            _description,
            msg.sender, // assuming you want to set the owner as the function caller
            _pHLevel,
            _organicMatter,
            _nitrogenContent,
            _phosphorusContent,
            _potassiumContent,
            _area
        );
        landConnections.push(newObject);
        objectIdCounter++;
    }

    function editObject(
        uint256 _id,
        string memory _description,
        uint256 _pHLevel,
        uint256 _organicMatter,
        uint256 _nitrogenContent,
        uint256 _phosphorusContent,
        uint256 _potassiumContent,
        uint256 _area
    ) public {
        for (uint256 i = 0; i < landConnections.length; i++) {
            if (landConnections[i].id == _id) {
                landConnections[i].description = _description;
                landConnections[i].dateTime = block.timestamp;
                landConnections[i].pHLevel = _pHLevel;
                landConnections[i].organicMatter = _organicMatter;
                landConnections[i].nitrogenContent = _nitrogenContent;
                landConnections[i].phosphorusContent = _phosphorusContent;
                landConnections[i].potassiumContent = _potassiumContent;
                landConnections[i].area = _area;

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
