"use client";
import { useContext, useEffect, useState, useCallback } from "react";
import { CollabraryContext } from "@/common/context/CollabraryContext";
import { type Book } from "@/common/utils/types";

const Library = () => {
    const { collabraryContract } = useContext(CollabraryContext);
    const [books, setBooks] = useState<Book[]>([]);

    const getAllBooks = useCallback(async (): Promise<Book[]> => {
        const list = [];
        const n = (await collabraryContract.numberOfBooks()).words[0];
        for (let i = 0; i < n; i++) {
            const b = await collabraryContract.books(i)
            list.push({
                title: b[0],
                author: b[1],
                description: b[2],
                genreId: b[3].words[0],
            } as Book)
        }
        return list;
    }, [collabraryContract]);

    useEffect(() => {
        getAllBooks().then(r => setBooks(r));
    }, [])
    
    return (
        <div>

        </div>
    );
};

export default Library;