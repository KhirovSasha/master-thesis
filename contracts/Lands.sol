// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lands {
    struct ContractObject {
        uint256 id;
        address owner;
        uint256 value;
    }

    ContractObject[] public contractObjects;
    uint256 private objectIdCounter = 1; // Initialize the counter for object IDs.

    constructor() {
        addObject(100);
        addObject(200);
        addObject(300);
    }

    function addObject(uint256 _value) private {
        // Create and add a new object to the array.
        ContractObject memory newObject = ContractObject(objectIdCounter, msg.sender, _value);
        contractObjects.push(newObject);
        objectIdCounter++; // Increment the object ID counter.
    }

    function createObject(uint256 _value) public {
        // Create and add a new object to the array.
        addObject(_value);
    }

    function getObjectCount() public view returns (uint256) {
        // Get the count of saved objects.
        return contractObjects.length;
    }

    function getObject(uint256 index) public view returns (uint256, address, uint256) {
        // Get the id, owner, and value of an object by index.
        require(index < contractObjects.length, "Index out of bounds");
        ContractObject memory object = contractObjects[index];
        return (object.id, object.owner, object.value);
    }

    function getAllObjects() public view returns (ContractObject[] memory) {
        // Return the array of objects directly.
        return contractObjects;
    }
}
