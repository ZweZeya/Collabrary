import { useState, useEffect, useContext, useCallback } from "react";
import { CollabraryContext } from "./context/CollabraryContext";
import { type Book } from "./utils/types";

const useBook = (bookId: number) => {
    const [book, setBook] = useState<Book>();
    const { collabraryContract } = useContext(CollabraryContext);

    const fetchBook = useCallback(async () => {
        return await collabraryContract.books(bookId);
    }, [collabraryContract, bookId])

    useEffect(() => {
        fetchBook().then(b => setBook({
            id: bookId,
            title: b.title,
            author: b.author,
            genreId: b.genre.words[0],
            status: b.status.words[0]
        }));
    }, [bookId, fetchBook])

    return book;
}

export { useBook };