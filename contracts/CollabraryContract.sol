//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./AuthContract.sol";

contract CollabraryContract is AuthContract {

    uint private bookId;
    uint8 public constant BOOK_LOAN_LIMIT = 4;
    uint[] public bookIds;
    mapping (uint => Book) public books;
    mapping (uint => uint[]) public booksByGenre;

    constructor() {
        bookId = 0;
    }

    event BookAdded(Book indexed _book);
    event BookRemoved(Book indexed _book);
    event BookLoanRequested(Book indexed _book);
    event BookLoanApproved(Book indexed _book);
    event BookLoanRejected(Book indexed _book);
    event BookReturnRequested(Book indexed _book);
    event BookReturnApproved(Book indexed _book);
    event BookReturnRejected(Book indexed _book);

    modifier withinLoanLimit() {
        require(users[msg.sender].loanedBookIds.length < BOOK_LOAN_LIMIT, "You have exceeded book loan limit.");
        _;
    }

    error bookStatusError();
    error unAuthorised();

    function getBookCount() public view returns(uint) {
        return bookIds.length;
    }

    function getBookCountByGenre(uint _genre) public view returns(uint) {
        return booksByGenre[_genre].length;
    }

    function getOwnedBookCount() public view returns(uint) {
        return users[msg.sender].ownedBookIds.length;
    }
    
    function getLoanedBookCount() public view returns(uint) {
        return users[msg.sender].loanedBookIds.length;
    }

    function getOwnedBookIdByIndex(uint _ownedIndex) public view returns(uint) {
        return users[msg.sender].ownedBookIds[_ownedIndex];
    }
    
    function getLoanedBookIdByIndex(uint _loanedIndex) public view returns(uint) {
        return users[msg.sender].loanedBookIds[_loanedIndex];
    }

    function createNewBook(string memory _title, string memory _author, uint _genre) private view returns(Book memory) {
        return Book(
            _title,
            _author, 
            _genre, 
            msg.sender, 
            address(0), 
            BookStatus.Available,
            bookIds.length,
            users[msg.sender].ownedBookIds.length,
            0,
            booksByGenre[_genre].length
        ); 
    }

    function addBook(string memory _title, string memory _author, uint _genre) public {

        Book memory newBook = createNewBook(_title, _author, _genre);
        books[bookId] = newBook;

        // Insert the book id into owner and genre arrays
        bookIds.push(bookId);
        users[msg.sender].ownedBookIds.push(bookId);
        booksByGenre[_genre].push(bookId);

        bookId++;

        emit BookAdded(newBook);
    }

    function removeBook(uint _bookId) public {
        
        Book memory _bookToBeRemoved = books[_bookId];

        if (_bookToBeRemoved.bookOwner != msg.sender) {
            revert unAuthorised();
        }

        if (_bookToBeRemoved.status != BookStatus.Available) {
            revert bookStatusError();
        }

        // Swap the last index with the index to be removed
        uint idIndex = _bookToBeRemoved.idIndex;
        uint lastBookId = bookIds[bookIds.length-1];
        bookIds[idIndex] = lastBookId;
        bookIds.pop();
        books[lastBookId].idIndex = idIndex;

        // Swap the last index with the index to be removed
        uint ownerIndex = _bookToBeRemoved.ownerIndex;
        uint lastBookIdOfOwner = users[msg.sender].ownedBookIds[users[msg.sender].ownedBookIds.length-1];
        users[msg.sender].ownedBookIds[ownerIndex] = lastBookIdOfOwner;
        users[msg.sender].ownedBookIds.pop();
        books[lastBookIdOfOwner].ownerIndex = ownerIndex;

        // Swap the last index with the index to be removed
        uint genreIndex = _bookToBeRemoved.genreIndex;
        uint lastBookIdOfGenre = booksByGenre[_bookToBeRemoved.genre][booksByGenre[_bookToBeRemoved.genre].length-1];
        booksByGenre[_bookToBeRemoved.genre][genreIndex] = lastBookIdOfGenre;
        booksByGenre[_bookToBeRemoved.genre].pop();
        books[lastBookIdOfGenre].genreIndex = genreIndex;

        delete books[_bookId];

        emit BookRemoved(_bookToBeRemoved);
    }

    function requestBookLoan(uint _bookId) public withinLoanLimit {
        Book memory _bookToBeBorrowed = books[_bookId];

        if (_bookToBeBorrowed.bookOwner == msg.sender) {
            revert unAuthorised();
        }

        if (_bookToBeBorrowed.status != BookStatus.Available) {
            revert bookStatusError();
        }

        books[_bookId].status = BookStatus.LoanPending;
        books[_bookId].bookLoaner = msg.sender;
        emit BookLoanRequested(_bookToBeBorrowed);
    }

    function approveBookLoan(uint _bookId) public {
        Book memory _bookToBeBorrowed = books[_bookId];

        if (_bookToBeBorrowed.bookOwner != msg.sender) {
            revert unAuthorised();
        }

        if (_bookToBeBorrowed.status != BookStatus.LoanPending) {
            revert bookStatusError();
        }

        // Insert the book id into user array
        uint loanerIndex = users[_bookToBeBorrowed.bookLoaner].loanedBookIds.length;
        users[_bookToBeBorrowed.bookLoaner].loanedBookIds.push(_bookId);
        _bookToBeBorrowed.loanerIndex = loanerIndex;

        books[_bookId].status = BookStatus.Borrowed;
        emit BookLoanApproved(_bookToBeBorrowed);
    }

    function rejectBookLoan(uint _bookId) public {
        Book memory _bookToBeBorrowed = books[_bookId];

        if (_bookToBeBorrowed.bookOwner != msg.sender) {
            revert unAuthorised();
        }

        if (_bookToBeBorrowed.status != BookStatus.LoanPending) {
            revert bookStatusError();
        }

        books[_bookId].status = BookStatus.Available;
        emit BookLoanRejected(_bookToBeBorrowed);
    }

    function requestBookReturn(uint _bookId) public {
        Book memory _bookToBeReturned = books[_bookId];

        if (_bookToBeReturned.bookLoaner != msg.sender) {
            revert unAuthorised();
        }

        if (_bookToBeReturned.status != BookStatus.Borrowed) {
            revert bookStatusError();
        }

        books[_bookId].status = BookStatus.ReturnPending;
        emit BookReturnRequested(_bookToBeReturned);
    }

    function approveBookReturn(uint _bookId) public {
        Book memory _bookToBeReturned = books[_bookId];

        if (_bookToBeReturned.bookOwner != msg.sender) {
            revert unAuthorised();
        }

        if (_bookToBeReturned.status != BookStatus.ReturnPending) {
            revert bookStatusError();
        }

        // Swap the last index with the index to be removed
        address loaner = _bookToBeReturned.bookLoaner;
        uint loanerIndex = _bookToBeReturned.loanerIndex;
        uint lastBookIdOfLoaner = users[loaner].loanedBookIds[users[loaner].loanedBookIds.length-1];
        users[loaner].loanedBookIds[loanerIndex] = lastBookIdOfLoaner;
        users[loaner].loanedBookIds.pop();
        books[lastBookIdOfLoaner].loanerIndex = loanerIndex;

        books[_bookId].status = BookStatus.Available;
        emit BookReturnApproved(_bookToBeReturned);
    }

    function rejectBookReturn(uint _bookId) public {
        Book memory _bookToBeReturned = books[_bookId];

        if (_bookToBeReturned.bookOwner != msg.sender) {
            revert unAuthorised();
        }

        if (_bookToBeReturned.status != BookStatus.ReturnPending) {
            revert bookStatusError();
        }
        
        books[_bookId].status = BookStatus.ReturnPending;
        emit BookReturnRejected(_bookToBeReturned);
    }

}
