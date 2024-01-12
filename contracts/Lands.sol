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
    uint256 private objectIdCounter = 1;

    constructor() {
        addObject(
            "Company 1",
            "Title 1",
            150,
            "1210100000:03:176:0029",
            LegalStatus.LandsOfSettlements
        );
        addObject(
            "Company 2",
            "Title 2",
            200,
            "4820300000:08:245:0097",
            LegalStatus.LandForConstruction
        );
        addObject(
            "Company 3",
            "Title 3",
            300,
            "6500800000:11:123:0145",
            LegalStatus.AgriculturalLands
        );
        addObject(
            "Company 4",
            "Title 4",
            300,
            "2910400000:05:311:0072",
            LegalStatus.IndustrialAndCommercialLands
        );
        addObject(
            "Company 5",
            "Title 5",
            300,
            "8300100000:02:189:0013",
            LegalStatus.LandObjectsAndSpecialPurposes
        );
    }

    function addObject(
        string memory _companyName,
        string memory _title,
        uint256 _area,
        string memory _cadastralNumber,
        LegalStatus _legalStatus
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
        contractObjects.push(newObject);
        objectIdCounter++;
    }

    function createObject(
        string memory _companyName,
        string memory _title,
        uint256 _area,
        string memory _cadastralNumber,
        LegalStatus _legalStatus
    ) public {
        addObject(_companyName, _title, _area, _cadastralNumber, _legalStatus);
    }

    function getObjectCount() public view returns (uint256) {
        return objectIdCounter - 1;
    }

    function getObject(uint256 _id) public view returns (ContractObject memory) {
        require(_id < objectIdCounter, "Object not found");
        return contractObjects[_id - 1];
    }

    function getAllObjects() public view returns (ContractObject[] memory) {
        return contractObjects;
    }

    function deleteObject(uint256 objectId) public {
        require(objectId < objectIdCounter, "Object not found");
        require(contractObjects[objectId - 1].owner == msg.sender, "Caller is not the owner");

        // Delete the object data
        delete contractObjects[objectId - 1];
    }

    function editObject(
        uint256 objectId,
        uint256 area,
        string memory cadastralNumber,
        LegalStatus legalStatus,
        string memory companyName,
        string memory title
    ) public {
        require(objectId < objectIdCounter, "Object not found");

        ContractObject storage obj = contractObjects[objectId - 1];
        require(obj.owner == msg.sender, "Caller is not the owner");

        obj.area = area;
        obj.cadastralNumber = cadastralNumber;
        obj.legalStatus = legalStatus;
        obj.companyName = companyName;
        obj.title = title;
    }
}
