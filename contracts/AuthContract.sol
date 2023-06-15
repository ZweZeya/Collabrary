//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AuthContract {

    struct User {
        address userAddress;
        string username;
        string firstName;
        string lastName;
        string email;
    }

    mapping(address => User) public users;
    mapping(string => bool) private _isUsernameTaken;

    event newUserRegistered(address indexed _address);

    modifier validUser() {
        require(users[msg.sender].userAddress != address(0), "You are not a registered user.");
        _;
    }

    function isUserRegistered() public view returns(bool) {
        return users[msg.sender].userAddress != address(0);
    }
 
    function register(
        string memory _username,
        string memory _firstName,
        string memory _lastName,
        string memory _email
    ) public {
        require(users[msg.sender].userAddress == address(0), "You are already a registered user.");
        require(_isUsernameTaken[_username] == false, "Username is already taken.");
        User memory newUser = User(msg.sender, _username, _firstName, _lastName, _email);
        users[msg.sender] = newUser;
        emit newUserRegistered(msg.sender);
    }

}