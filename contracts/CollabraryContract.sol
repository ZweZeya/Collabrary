//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./AuthContract.sol";

contract CollabraryContract is AuthContract {

    enum BookStatus { 
        Available,
        Borrowed,
        Pending
    }

    struct Book {
        string title;
        string author;
        string description;
        address lender;
        address borrower;
        BookStatus status;
    }

    uint public numberOfBooks;
    uint bookId;
    mapping (uint => Book) public books;

    constructor() {
        numberOfBooks = 0;
        bookId = 0;
    }

    event BookAdded(Book indexed _book);
    event BookRemoved(Book indexed _book);
    event BorrowBookRequested(Book indexed _book);

    modifier onlyLender(uint _bookId) {
        Book memory _book = books[bookId];
        require(msg.sender == _book.lender, "You are not authorised to remove this book.");
        _;
    }

    modifier nonLender(uint _bookId) {
        Book memory _bookToBeRemoved = books[bookId];
        require(msg.sender != _bookToBeRemoved.lender, "This book belongs to you.");
        _;
    }

    function addBook(string memory _title, string memory _author, string memory _description) public {
        Book memory newBook = Book(_title, _author, _description, msg.sender, address(0), BookStatus.Available);
        books[bookId] = newBook;
        bookId++;
        numberOfBooks++;
        emit BookAdded(newBook);
    }

    function removeBook(uint _bookId) public onlyLender(_bookId) {
        Book memory _bookToBeRemoved = books[_bookId];
        delete books[_bookId];
        numberOfBooks--;
        emit BookRemoved(_bookToBeRemoved);
    }

    function requestBorrowBook(uint _bookId) public {
        Book memory _bookToBeBorrowed = books[_bookId];
        require(msg.sender != _bookToBeBorrowed.lender, "You cannot borrow a book owned by you.");
        books[_bookId].status = BookStatus.Pending;
        books[_bookId].borrower = msg.sender;
        emit BorrowBookRequested(_bookToBeBorrowed);
    }

    function returnBook(uint _bookId) public {

    }

    function approveBorrowBook(uint _bookId) public {

    }

    function rejectBorrowBook(uint _bookId) public {

    }

    function approveReturnBook(uint _bookId) public {

    }

    function rejectReturnBook(uint _bookId) public {

    }

}