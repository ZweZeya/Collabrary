"use client";
import { useRouter } from "next/navigation";
import { type Book } from "@/common/utils/types";
import { type ColorScheme } from "@/common/utils/propsInterfaces";

const BookElement = ({book}: {book: Book}) => {
    const { bg, text } = getBookColor(book);
    const router = useRouter();

    const handleBookClick = () => {
        router.push(`/Book/${book.id}`);
    };

    return (
        <div className="px-2 py-2 flex flex-col items-center">
            <div
                className="h-48 w-40 flex flex-col items-center py-3 px-1 cursor-pointer"
                style={{
                    backgroundColor: bg, 
                    color: text
                }}
                onClick={handleBookClick}
            >
                <p>{ book.title }</p>
                <p className="mt-auto text-sm">{ book.author }</p>
            </div>
        </div>
    );
};

const getBookColor = (book: Book): ColorScheme => {
    switch (book.genreId) {
        case 1:
            return {bg: "#FC4F00", text: "#FFFFFF"};
        case 2:
            return {bg: "#46C2CB", text: "#FFFFFF"};
        case 3:
            return {bg: "#FF6666", text: "#FFFFFF"};
        case 4:
            return {bg: "#B71375", text: "#FFFFFF"};
        case 5:
            return {bg: "#070A52", text: "#FFFFFF"};
        case 6:
            return {bg: "#FFB84C", text: "#FFFFFF"};
        case 7:
            return {bg: "#DBDFAA", text: "#FFFFFF"};
        case 8:
            return {bg: "#C38154", text: "#FFFFFF"};
        default:
            return {bg: "#FFFFFF", text: "#FFFFFF"};
    };
};   

export default BookElement;