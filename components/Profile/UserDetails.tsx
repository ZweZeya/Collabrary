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

    const getOwnedBooks = useCallback(async (): Promise<Book[]> => {
        const list = [];
        const n = (await collabraryContract.getOwnedBookCount({from: userAddress})).words[0];
        for (let i = 0; i < n; i++) {
            const bookId = (await collabraryContract.getOwnedBookIdByIndex(i, {from: userAddress})).words[0];
            const book = await collabraryContract.books(bookId);
            list.push({
                title: book[0],
                author: book[1],
                genreId: book[2].words[0]
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
                title: book[0],
                author: book[1],
                genreId: book[2].words[0]
            } as Book);
        }
        return list;
    }, [collabraryContract, userAddress]);

    useEffect(() => {
        getOwnedBooks().then(r => setOwnedBooks(r));
        getLoanedBooks().then(r => setLoanedBooks(r));
    }, [getOwnedBooks, getLoanedBooks])

    return (
        <div>
            <table className="text-left">
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
                    <tr>
                        <th>Owned Books</th>
                        <td>{ownedBooks.length}</td>
                    </tr>
                    <tr>
                        <th>Loaned Books</th>
                        <td>{loanedBooks.length}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserDetails;