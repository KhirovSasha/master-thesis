// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FiveParameterContract {
    uint256 public myParameter;

    constructor() {
        // Initialize the parameter to a default value when the contract is deployed.
        myParameter = 0;
    }

    function setParameter(uint256 newValue) public {
        // Function to set the parameter to a new value.
        myParameter = newValue;
    }

    function getParameter() public view returns (uint256) {
        // Function to get the current value of the parameter.
        return myParameter;
    }
}
