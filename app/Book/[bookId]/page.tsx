"use client";
import Layout from "@/components/Module/Layout";
import PageHeader from "@/components/Module/PageHeader";
import { useParams } from "next/navigation";
import { useBook } from "@/common/hooks";
import BookDetails from "@/components/Book/BookDetails";


const BookPage = () => {
    const { bookId } = useParams();
    const book = useBook(+bookId);

    return (
        <Layout>
            <PageHeader title="Book"></PageHeader>
            {book && <BookDetails book={book} />}
        </Layout>
    );
};

export default BookPage;