"use client";
import { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "@/common/context/UserContext";
import { CollabraryContext } from "@/common/context/CollabraryContext";
import { type Book } from "@/common/utils/types";

const UserDetails = () => {
    const { collabraryContract } = useContext(CollabraryContext);
    const { userData } = useContext(UserContext);
    const { user, userAddress } = userData;
    const [ownedBooks, setOwnedBooks] = useState<Book[]>([]);
    const [loanedBooks, setLoanedBooks] = useState<Book[]>([]);
    const [loanRequestedBooks, setLoanRequestedBooks] = useState<Book[]>([]);
    const [loanedOutBooks, setLoanedOutBooks] = useState<Book[]>([]);
    const [returnRequestedBooks, setReturnRequestedBooks] = useState<Book[]>([]);

    const getOwnedBooks = useCallback(async (): Promise<Book[]> => {
        const list = [];
        const n = (await collabraryContract.getOwnedBookCount({from: userAddress})).words[0];
        for (let i = 0; i < n; i++) {
            const bookId = (await collabraryContract.getOwnedBookIdByIndex(i, {from: userAddress})).words[0];
            const book = await collabraryContract.books(bookId);
            list.push({
                id: bookId,
                title: book.title,
                author: book.author,
                genreId: book.genre.words[0],
                status: book.status.words[0]
            } as Book);
        }
        return list;
    }, [collabraryContract, userAddress]);

    const getLoanedBooks = useCallback(async (): Promise<Book[]> => {
        const list = [];
        const n = (await collabraryContract.getLoanedBookCount({from: userAddress})).words[0];
        for (let i = 0; i < n; i++) {
            const bookId = (await collabraryContract.getLoanedBookIdByIndex(i, {from: userAddress})).words[0];
            const book = await collabraryContract.books(bookId);
            list.push({
                id: bookId,
                title: book.title,
                author: book.author,
                genreId: book.genre.words[0],
            } as Book);
        }
        return list;
    }, [collabraryContract, userAddress]);

    useEffect(() => {
        getOwnedBooks().then(r => setOwnedBooks(r));
        getLoanedBooks().then(r => setLoanedBooks(r));
    }, [getOwnedBooks, getLoanedBooks]);

    useEffect(() => {
        setLoanedOutBooks(ownedBooks.filter(book => book.status == 1));
        setLoanRequestedBooks(ownedBooks.filter(book => book.status == 2));
        setReturnRequestedBooks(ownedBooks.filter(book => book.status == 3));
    }, [ownedBooks])

    return (
        <div>
            <p className="text-2xl font-medium">Details</p>
            <table className="text-left border-collapse">
                <tbody>
                    <tr>
                        <th>Address</th>
                        <td>{user[0]}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{user[1]}</td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <td>{user[2]}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>{user[3]}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user[4]}</td>
                    </tr>
                </tbody>
            </table>

            <p className="text-2xl font-medium">Book Summary</p>
            <table className="text-left border-collapse">
                <tbody>
                <tr>
                        <th>Owned Books</th>
                        <td>{ownedBooks.length}</td>
                    </tr>
                    <tr>
                        <th>Loaned Out Books</th>
                        <td>{loanedOutBooks.length}</td>
                    </tr>
                    <tr>
                        <th>Loan Requested Books</th>
                        <td>{loanRequestedBooks.length}</td>
                    </tr>
                    <tr>
                        <th>Return Requested Books</th>
                        <td>{returnRequestedBooks.length}</td>
                    </tr>
                    <tr>
                        <th>Loaned Books</th>
                        <td>{loanedBooks.length}</td>
                    </tr>
                    <tr>
                        <th>Books in Inventory</th>
                        <td>{ownedBooks.length + loanedBooks.length - loanedOutBooks.length}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserDetails;