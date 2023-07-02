import { type Book } from "@/common/utils/types";
import { ReactNode } from "react";
import BookElement from "./BookElement";

const LibraryGrid = ({books}: {books: Book[]}) => {

    const bookElements = books.map((b, i) => {
        return <BookElement key={i} book={b} />
    })

    return (
        <div className="grid grid grid-cols-4 gap-4">
            { bookElements }
        </div>
    );
};

export default LibraryGrid;
