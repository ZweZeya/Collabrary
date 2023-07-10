//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";

contract AuthContract {

    mapping(address => User) public users;
    mapping(string => bool) private _isUsernameTaken;

    event newUserRegistered(address indexed _address);
    event userDeleted(address indexed _address);

    modifier onlyRegisteredUsers() {
        require(users[msg.sender].isRegistered == true, "You are not a registered user.");
        _;
    }
 
    function register(
        string memory _username,
        string memory _firstName,
        string memory _lastName,
        string memory _email
    ) public {
        require(users[msg.sender].isRegistered == false, "You are already a registered user.");
        require(_isUsernameTaken[_username] == false, "Username is already taken.");
        
        uint[] memory ownedBookIds = new uint[](100);
        uint[] memory loanedBookIds = new uint[](100);
        User memory newUser = User(_username, _firstName, _lastName, _email, true, ownedBookIds, loanedBookIds);
        users[msg.sender] = newUser;
        emit newUserRegistered(msg.sender);
    }

    function deleteUser() public onlyRegisteredUsers {
        users[msg.sender].isRegistered = false;
        _isUsernameTaken[users[msg.sender].username] = false;
        emit userDeleted(msg.sender);
    }

}