"use client";
import { useContext, useEffect, useState, useCallback } from "react";
import { CollabraryContext } from "@/common/context/CollabraryContext";
import { UserContext } from "@/common/context/UserContext";
import { type Book } from "@/common/utils/types";
import LibraryGrid from "./LibraryGrid";

const Library = ({genre}: {genre: number}) => {
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
                title: book.title,
                author: book.author,
                genreId: book.genre.words[0],
            } as Book)
        }
        return list;
    }, [collabraryContract, userAddress]);

    const getBooksByGenre = useCallback(async (genre: number): Promise<Book[]> => {
        const list = [];
        const n = (await collabraryContract.getBookCountByGenre(genre, {from: userAddress})).words[0];
        for (let i = 0; i < n; i++) {
            const bookId = (await collabraryContract.booksByGenre(genre, i)).words[0];
            const book = await collabraryContract.books(bookId);
            list.push({
                title: book.title,
                author: book.author,
                genreId: book.genre.words[0],
            } as Book)
        }
        return list;
    }, [collabraryContract, userAddress]);

    useEffect(() => {
        if (genre > 0) {
            getBooksByGenre(genre).then(r => setBooks(r));
        } else {
            getAllBooks().then(r => setBooks(r));
        }
    }, [getAllBooks, getBooksByGenre, genre])
    
    return (
        <div>
            <LibraryGrid books={books} />
        </div>
    );
};

export default Library;