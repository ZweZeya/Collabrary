import { type Book } from "@/common/utils/types";
import { BookStatus } from "@/common/utils/enum";
import genres from "@/common/utils/genres.json";

const BookDetails = ({book}: {book: Book}) => {

    return (
        <table>
            <tbody className="text-left">
                <tr>
                    <th>Title</th>
                    <td>{book.title}</td>
                </tr>
                <tr>
                    <th>Author</th>
                    <td>{book.author}</td>
                </tr>
                <tr>
                    <th>Genre</th>
                    <td>{genres[book.genreId].name}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>{BookStatus[book.status]}</td>
                </tr>
                <tr>
                    <th>Owner</th>
                    <td>{book.bookOwner}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default BookDetails;