//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AuthContract {

    struct User {
        string username;
        bytes32 passwordHash;
    }

    mapping(address => User) public users;
    mapping(address => bool) _exists;

    function register(
        string memory _username,
        string memory _password
    ) public {
        require (!_exists[msg.sender], "You are already registered.");
        bytes32 passwordHash = keccak256(abi.encodePacked(_password));
        User memory newUser = User(_username, passwordHash);
        users[msg.sender] = newUser;
        _exists[msg.sender] = true;
    }

    function login() public {

    }

    function logout() public {

    }

}