import { type Book } from "@/common/utils/types";
import { BookStatus } from "@/common/utils/enum";
import genres from "@/common/utils/genres.json";
import BookElement from "./BookElement";
import { PropsWithChildren } from "react";
import BookStatusElement from "./BookStatusElement";

const BookDetails = ({book}: {book: Book}) => {

    return (
        <div className="flex gap-x-8">
            <div className="grid grid-cols-2 items-center gap-x-4">
                <H>Title</H>
                <C>{book.title}</C>
                <H>Author</H>
                <C>{book.author}</C>
                <H>Genre</H>
                <C>{genres[book.genreId].name}</C>
                <H>Status</H>
                <C><BookStatusElement status={book.status} /></C>
                <H>Owner</H>
                <C>{book.bookOwner}</C>
            </div>
            {/* <BookElement book={book} /> */}
        </div>
    );
};

const H = (props: PropsWithChildren) => {
    return (
        <p className="text-lg font-medium">
            { props.children }:
        </p>
    );
};

const C = (props: PropsWithChildren) => {
    return (
        <p className="">
            { props.children }
        </p>
    );
};

export default BookDetails;