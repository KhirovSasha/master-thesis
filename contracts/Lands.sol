// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lands {
    enum LegalStatus {
        AgriculturalLands,
        LandsOfSettlements,
        IndustrialAndCommercialLands,
        RecreationalLands,
        LandForConstruction,
        LandsOfTheWaterFund,
        LandsOfTheForestFund,
        LandObjectsAndSpecialPurposes
    }

    struct ContractObject {
        uint256 id;
        address owner;
        uint256 area;
        string cadastralNumber;
        LegalStatus legalStatus;
        string companyName;
        string title;
    }

    ContractObject[] public contractObjects;
    uint256 private objectIdCounter = 1; // Initialize the counter for object IDs.

    constructor() {
        addObject(
            100,
            "Cadastral-100",
            LegalStatus.LandsOfSettlements,
            "Conmapny 1",
            "Title 1"
        );
        addObject(
            200,
            "Cadastral-200",
            LegalStatus.LandForConstruction,
            "Conmapny 2",
            "Title 2"
        );
        addObject(
            300,
            "Cadastral-300",
            LegalStatus.LandObjectsAndSpecialPurposes,
            "Conmapny 3",
            "Title 3"
        );
    }

    function addObject(
        uint256 _area,
        string memory _cadastralNumber,
        LegalStatus _legalStatus,
        string memory _companyName,
        string memory _title
    ) private {
        // Create and add a new object to the array.
        ContractObject memory newObject = ContractObject(
            objectIdCounter,
            msg.sender,
            _area,
            _cadastralNumber,
            _legalStatus,
            _companyName,
            _title
        );
        contractObjects.push(newObject);
        objectIdCounter++; // Increment the object ID counter.
    }

    function createObject(
        uint256 _area,
        string memory _cadastralNumber,
        LegalStatus _legalStatus,
        string memory _companyName,
        string memory _title
    ) public {
        addObject(_area, _cadastralNumber, _legalStatus, _companyName, _title);
    }

    function getObjectCount() public view returns (uint256) {
        return contractObjects.length;
    }

    function getObject(
        uint256 _id
    ) public view returns (ContractObject memory) {
        for (uint256 i = 0; i < contractObjects.length; i++) {
            if (contractObjects[i].id == _id) {
                return contractObjects[i];
            }
        }

        revert("Object not found");
    }

    function getAllObjects() public view returns (ContractObject[] memory) {
        return contractObjects;
    }

    function deleteObject(uint256 objectId) public {
        uint256 indexToDelete = findObjectIndex(objectId);

        require(indexToDelete != type(uint256).max, "Object not found");
        require(
            contractObjects[indexToDelete].owner == msg.sender,
            "Caller is not the owner"
        );

        contractObjects[indexToDelete] = contractObjects[
            contractObjects.length - 1
        ];
        contractObjects.pop();
    }

    function editObject(
        uint256 objectId,
        uint256 area,
        string memory cadastralNumber,
        LegalStatus legalStatus,
        string memory companyName,
        string memory title
    ) public {
        uint256 indexToEdit = findObjectIndex(objectId);

        require(indexToEdit != type(uint256).max, "Object not found");
        require(
            contractObjects[indexToEdit].owner == msg.sender,
            "Caller is not the owner"
        );

        contractObjects[indexToEdit].area = area;
        contractObjects[indexToEdit].cadastralNumber = cadastralNumber;
        contractObjects[indexToEdit].legalStatus = legalStatus;
        contractObjects[indexToEdit].companyName = companyName;
        contractObjects[indexToEdit].title = title;
    }

    function findObjectIndex(uint256 objectId) internal view returns (uint256) {
        for (uint256 i = 0; i < contractObjects.length; i++) {
            if (contractObjects[i].id == objectId) {
                return i;
            }
        }

        return type(uint256).max;
    }
}
