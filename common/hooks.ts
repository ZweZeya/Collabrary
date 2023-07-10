import { useState, useEffect, useContext, useCallback } from "react";
import { CollabraryContext } from "./context/CollabraryContext";
import { UserContext } from "./context/UserContext";
import { type Book } from "./utils/types";

const useBook = (bookId: number) => {
    const [book, setBook] = useState<Book>();
    const { collabraryContract } = useContext(CollabraryContext);
    const { userData } = useContext(UserContext);
    const { AuthContract } = userData;

    const fetchBook = useCallback(async (): Promise<Book> => {
        const bookData = await collabraryContract.books(bookId);
        const bookOwnerUsername = (await AuthContract.users(bookData.bookOwner)).username;
        const bookLoanerUsername = (await AuthContract.users(bookData.bookLoaner)).username;
        console.log(bookData)
        return {
            id: bookId,
            title: bookData.title,
            author: bookData.author,
            genreId: bookData.genre.words[0],
            status: bookData.status.words[0],
            bookOwner: bookOwnerUsername,
            bookLoaner: bookLoanerUsername
        } as Book
    }, [collabraryContract, bookId, AuthContract])

    useEffect(() => {
        fetchBook().then(b => setBook(b));
    }, [bookId, fetchBook])

    return book;
}

export { useBook };