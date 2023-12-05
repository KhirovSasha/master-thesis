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
        string pHLevel;
        string organicMatter;
        string nitrogenContent;
        string phosphorusContent;
        string potassiumContent;
        string area;
    }

    LandArray[] public landConnections;
    uint256 private objectIdCounter = 1;

    constructor(
        uint[] memory _landId,
        string[] memory _description,
        string[] memory _pHLevel,
        string[] memory _organicMatter,
        string[] memory _nitrogenContent,
        string[] memory _phosphorusContent,
        string[] memory _potassiumContent,
        string[] memory _area
    ) {
        require(
            _landId.length == _description.length &&
                _description.length == _pHLevel.length &&
                _pHLevel.length == _organicMatter.length &&
                _organicMatter.length == _nitrogenContent.length &&
                _nitrogenContent.length == _phosphorusContent.length &&
                _phosphorusContent.length == _potassiumContent.length &&
                _potassiumContent.length == _area.length,
            "Array lengths mismatch"
        );

        for (uint256 i = 0; i < _landId.length; i++) {
            addObject(
                _landId[i],
                _description[i],
                _pHLevel[i],
                _organicMatter[i],
                _nitrogenContent[i],
                _phosphorusContent[i],
                _potassiumContent[i],
                _area[i]
            );
        }
    }

    function createParameter(
        uint256 _landId,
        string memory _description,
        string memory _pHLevel,
        string memory _organicMatter,
        string memory _nitrogenContent,
        string memory _phosphorusContent,
        string memory _potassiumContent,
        string memory _area
    ) public {
        addObject(
            _landId,
            _description,
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
        string memory _pHLevel,
        string memory _organicMatter,
        string memory _nitrogenContent,
        string memory _phosphorusContent,
        string memory _potassiumContent,
        string memory _area
    ) private {
        LandArray memory newObject = LandArray(
            objectIdCounter,
            _landId,
            block.timestamp,
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
        string memory _pHLevel,
        string memory _organicMatter,
        string memory _nitrogenContent,
        string memory _phosphorusContent,
        string memory _potassiumContent,
        string memory _area
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

     function getAllObjects() public view returns (LandArray[] memory) {
        return landConnections;
    }
}
