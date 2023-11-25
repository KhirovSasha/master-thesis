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
    }

    ContractObject[] public contractObjects;
    uint256 private objectIdCounter = 1; // Initialize the counter for object IDs.

    constructor() {
        addObject(100, "Cadastral-100", LegalStatus.LandsOfSettlements);
        addObject(200, "Cadastral-200", LegalStatus.LandForConstruction);
        addObject(300, "Cadastral-300", LegalStatus.LandObjectsAndSpecialPurposes);
    }

    function addObject(
        uint256 _value,
        string memory _cadastralNumber,
        LegalStatus _legalStatus
    ) private {
        // Create and add a new object to the array.
        ContractObject memory newObject = ContractObject(
            objectIdCounter,
            msg.sender,
            _value,
            _cadastralNumber,
            _legalStatus
        );
        contractObjects.push(newObject);
        objectIdCounter++; // Increment the object ID counter.
    }

    function createObject(
        uint256 _value,
        string memory _cadastralNumber,
        LegalStatus _legalStatus
    ) public {
        // Create and add a new object to the array.
        addObject(_value, _cadastralNumber, _legalStatus);
    }

    function getObjectCount() public view returns (uint256) {
        // Get the count of saved objects.
        return contractObjects.length;
    }

    function getLegalStat() public pure returns (LegalStatus) {
        return LegalStatus.LandsOfSettlements;
    }

    function getObject(
        uint256 index
    ) public view returns (ContractObject memory) {
        // Get the id, owner, area, and cadastral number of an object by index.
        require(index < contractObjects.length, "Index out of bounds");

        ContractObject memory object = contractObjects[index];
        return object;
    }

    function getAllObjects() public view returns (ContractObject[] memory) {
        // Return the array of objects directly.
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

    function editObject(uint256 objectId, uint256 newValue) public {
        uint256 indexToEdit = findObjectIndex(objectId);

        require(indexToEdit != type(uint256).max, "Object not found");
        require(
            contractObjects[indexToEdit].owner == msg.sender,
            "Caller is not the owner"
        );

        contractObjects[indexToEdit].area = newValue;
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
