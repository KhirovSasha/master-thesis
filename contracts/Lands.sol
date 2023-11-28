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
    }

    ContractObject[] public contractObjects;
    uint256 private objectIdCounter = 1; // Initialize the counter for object IDs.

    constructor() {
        addObject(100, "Cadastral-100", LegalStatus.LandsOfSettlements, 'Conmapny 1');
        addObject(200, "Cadastral-200", LegalStatus.LandForConstruction, 'Conmapny 2');
        addObject(300, "Cadastral-300", LegalStatus.LandObjectsAndSpecialPurposes, 'Conmapny 3');
    }

    function addObject(
        uint256 _value,
        string memory _cadastralNumber,
        LegalStatus _legalStatus,
        string memory _companyName
    ) private {
        // Create and add a new object to the array.
        ContractObject memory newObject = ContractObject(
            objectIdCounter,
            msg.sender,
            _value,
            _cadastralNumber,
            _legalStatus,
            _companyName
        );
        contractObjects.push(newObject);
        objectIdCounter++; // Increment the object ID counter.
    }

    function createObject(
        uint256 _value,
        string memory _cadastralNumber,
        LegalStatus _legalStatus,
        string memory _companyName
    ) public {
        addObject(_value, _cadastralNumber, _legalStatus, _companyName);
    }

    function getObjectCount() public view returns (uint256) {
        // Get the count of saved objects.
        return contractObjects.length;
    }

    function getObject(
        uint256 index
    ) public view returns (ContractObject memory) {
        require(index < contractObjects.length, "Index out of bounds");

        ContractObject memory object = contractObjects[index];
        return object;
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

    function editObject(uint256 objectId, uint256 area, string memory cadastralNumber, LegalStatus legalStatus, string memory companyName) public {
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
