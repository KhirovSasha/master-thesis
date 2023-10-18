// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FiveParameterContract {
    address public owner;

    struct MyParameters {
        uint256 param1;
        uint256 param2;
        uint256 param3;
        uint256 param4;
        uint256 param5;
    }

    MyParameters[] public parameterList;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setParameters(
        uint256 _param1,
        uint256 _param2,
        uint256 _param3,
        uint256 _param4,
        uint256 _param5
    ) public onlyOwner {
        MyParameters memory newParameters = MyParameters({
            param1: _param1,
            param2: _param2,
            param3: _param3,
            param4: _param4,
            param5: _param5
        });

        parameterList.push(newParameters);
    }

    function getParameter(uint256 index) public view returns (MyParameters memory) {
        require(index < parameterList.length, "Index out of range");
        return parameterList[index];
    }

    function getParameterCount() public view returns (uint256) {
        return parameterList.length;
    }
}
