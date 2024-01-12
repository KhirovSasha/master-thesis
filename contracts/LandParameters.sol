// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract LandParameters {
    struct LandArray {
        uint256 id;
        uint256 landId;
        uint256 dateTime;
        string title; 
        string description;
        address owner;
        string pHLevel;
        string organicMatter;
        string nitrogenContent;
        string phosphorusContent;
        string potassiumContent;
    }

    LandArray[] public landConnections;
    uint256 private objectIdCounter = 1;

    constructor(
        uint256[] memory _landId,
        string[] memory _description,
        string[] memory _pHLevel,
        string[] memory _organicMatter,
        string[] memory _nitrogenContent,
        string[] memory _phosphorusContent,
        string[] memory _potassiumContent,
        string[] memory _title
    ) {
        require(
            _landId.length == _title.length &&
                _title.length == _description.length &&
                _description.length == _pHLevel.length &&
                _pHLevel.length == _organicMatter.length &&
                _organicMatter.length == _nitrogenContent.length &&
                _nitrogenContent.length == _phosphorusContent.length &&
                _phosphorusContent.length == _potassiumContent.length,
            "Array lengths mismatch"
        );

        for (uint256 i = 0; i < _landId.length; i++) {
            addObject(
                _landId[i],
                _title[i],
                _description[i],
                _pHLevel[i],
                _organicMatter[i],
                _nitrogenContent[i],
                _phosphorusContent[i],
                _potassiumContent[i]
            );
        }
    }

    function createParameter(
        uint256 _landId,
        string memory _title,
        string memory _description,
        string memory _pHLevel,
        string memory _organicMatter,
        string memory _nitrogenContent,
        string memory _phosphorusContent,
        string memory _potassiumContent
    ) public {
        addObject(
            _landId,
            _title,
            _description,
            _pHLevel,
            _organicMatter,
            _nitrogenContent,
            _phosphorusContent,
            _potassiumContent
        );
    }

    function addObject(
        uint256 _landId,
        string memory _title,
        string memory _description,
        string memory _pHLevel,
        string memory _organicMatter,
        string memory _nitrogenContent,
        string memory _phosphorusContent,
        string memory _potassiumContent
    ) private {
        LandArray memory newObject = LandArray(
            objectIdCounter,
            _landId,
            block.timestamp,
            _title,
            _description,
            msg.sender,
            _pHLevel,
            _organicMatter,
            _nitrogenContent,
            _phosphorusContent,
            _potassiumContent
        );

        landConnections.push(newObject);
        objectIdCounter++;
    }

    function editObject(
        uint256 _id,
        string memory _title,
        string memory _description,
        string memory _pHLevel,
        string memory _organicMatter,
        string memory _nitrogenContent,
        string memory _phosphorusContent,
        string memory _potassiumContent
    ) public {
        require(hasItem(_id), "Invalid object ID");

        LandArray storage landObject = landConnections[_id - 1];
        require(landObject.owner == msg.sender, "Caller is not the owner");

        landObject.title = _title;
        landObject.description = _description;
        landObject.dateTime = block.timestamp;
        landObject.pHLevel = _pHLevel;
        landObject.organicMatter = _organicMatter;
        landObject.nitrogenContent = _nitrogenContent;
        landObject.phosphorusContent = _phosphorusContent;
        landObject.potassiumContent = _potassiumContent;
    }

    function deleteObject(uint256 _id) public {
        require(hasItem(_id), "Invalid object ID");

        LandArray storage landObject = landConnections[_id - 1];
        require(landObject.owner == msg.sender, "Caller is not the owner");

        delete landConnections[_id - 1];
    }

    function getObjectById(uint256 _id) public view returns (LandArray memory) {
        require(_id <= objectIdCounter, "Object not found");
        return landConnections[_id - 1];
    }

    function getConnectionCount() public view returns (uint256) {
        return objectIdCounter - 1;
    }

    function getAllObjectsByLandId(
        uint256 _landId
    ) public view returns (LandArray[] memory) {
        LandArray[] memory filteredObjects = new LandArray[](objectIdCounter - 1);
        uint256 count = 0;

        for (uint256 i = 0; i < objectIdCounter - 1; i++) {
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

    function hasItem(uint256 _id) private view returns (bool) {
        return _id > 0 && _id <= objectIdCounter;
    }
}
