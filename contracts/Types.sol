//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

enum BookStatus { 
    Available,
    Borrowed,
    LoanPending,
    ReturnPending
}

struct Book {
    string title;
    string author;
    uint genre;
    address bookOwner;
    address bookLoaner;
    BookStatus status;
    uint idIndex;
    uint ownerIndex;
    uint loanerIndex;
    uint genreIndex;
}

struct User {
    address userAddress;
    string username;
    string firstName;
    string lastName;
    string email;
    bool isRegistered;
    uint[] ownedBookIds;
    uint[] loanedBookIds;
}