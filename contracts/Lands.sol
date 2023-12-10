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

    mapping(uint256 => ContractObject) public contractObjects;
    uint256 private objectIdCounter = 1;

    constructor() {
        addObject(
            150,
            "1210100000:03:176:0029",
            LegalStatus.LandsOfSettlements,
            "Company 1",
            "Title 1"
        );
        addObject(
            200,
            "4820300000:08:245:0097",
            LegalStatus.LandForConstruction,
            "Company 2",
            "Title 2"
        );
        addObject(
            300,
            "6500800000:11:123:0145",
            LegalStatus.AgriculturalLands,
            "Company 3",
            "Title 3"
        );
        addObject(
            300,
            "2910400000:05:311:0072",
            LegalStatus.IndustrialAndCommercialLands,
            "Company 4",
            "Title 4"
        );
        addObject(
            300,
            "8300100000:02:189:0013",
            LegalStatus.LandObjectsAndSpecialPurposes,
            "Company 5",
            "Title 5"
        );
    }

    function addObject(
        uint256 _area,
        string memory _cadastralNumber,
        LegalStatus _legalStatus,
        string memory _companyName,
        string memory _title
    ) private {
        ContractObject memory newObject = ContractObject(
            objectIdCounter,
            msg.sender,
            _area,
            _cadastralNumber,
            _legalStatus,
            _companyName,
            _title
        );
        contractObjects[objectIdCounter] = (newObject);
        objectIdCounter++;
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
        return objectIdCounter - 1;
    }

    function getObject(
        uint256 _id
    ) public view returns (ContractObject memory) {
        return contractObjects[_id];
    }

    function getAllObjects() public view returns (ContractObject[] memory) {
        ContractObject[] memory allObjects = new ContractObject[](
            objectIdCounter - 1
        );
        for (uint256 i = 1; i < objectIdCounter; i++) {
            allObjects[i - 1] = contractObjects[i];
        }
        return allObjects;
    }

    function deleteObject(uint256 objectId) public {
        require(hasItem(objectId), "Invalid object ID");
        
        ContractObject storage parameter = contractObjects[objectId];
        require(parameter.owner == msg.sender, "Caller is not the owner");
        
        delete contractObjects[objectId];
    }

    function editObject(
        uint256 objectId,
        uint256 area,
        string memory cadastralNumber,
        LegalStatus legalStatus,
        string memory companyName,
        string memory title
    ) public {
        require(!hasItem(objectId), "Object not found");

        ContractObject storage obj = contractObjects[objectId];
        require(obj.owner == msg.sender, "Caller is not the owner");

        obj.area = area;
        obj.cadastralNumber = cadastralNumber;
        obj.legalStatus = legalStatus;
        obj.companyName = companyName;
        obj.title = title;
    }

    function hasItem(uint256 _id) private view returns (bool) {
        return contractObjects[_id].id != 0;
    }
}
