"use client";
import { useContext, useEffect, useState, useCallback } from "react";
import { CollabraryContext } from "@/common/context/CollabraryContext";
import { UserContext } from "@/common/context/UserContext";
import { type Book } from "@/common/utils/types";
import LibraryGrid from "./LibraryGrid";

const Library = () => {
    const { collabraryContract } = useContext(CollabraryContext);
    const { userData } = useContext(UserContext);
    const { userAddress } = userData;
    const [books, setBooks] = useState<Book[]>([]);

    const getAllBooks = useCallback(async (): Promise<Book[]> => {
        const list = [];
        const n = (await collabraryContract.getBookCount({from: userAddress})).words[0];
        for (let i = 0; i < n; i++) {
            const bookId = (await collabraryContract.bookIds(i)).words[0];
            const book = await collabraryContract.books(bookId);
            list.push({
                title: book[0],
                author: book[1],
                genreId: book[2].words[0],
            } as Book)
        }
        return list;
    }, [collabraryContract, userAddress]);

    useEffect(() => {
        getAllBooks().then(r => setBooks(r));
    }, [getAllBooks])
    
    return (
        <div>
            <LibraryGrid books={books} />
        </div>
    );
};

export default Library;