"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/common/context/UserContext";
import { CollabraryContext } from "@/common/context/CollabraryContext";
import Layout from "@/components/Module/Layout";
import PageHeader from "@/components/Module/PageHeader";
import { useParams } from "next/navigation";
import { useBook } from "@/common/hooks";
import BookDetails from "@/components/Book/BookDetails";
import Button from "@/components/Button";
import { BookStatus } from "@/common/utils/enum";
import SimpleModal, { SimpleModalIcons } from "@/components/SimpleModal";
import { useRouter } from "next/navigation";

const BookPage = () => {
    const { bookId } = useParams();
    const book = useBook(+bookId);
    const { userData } = useContext(UserContext);
    const { user, userAddress } = userData;
    const { collabraryContract } = useContext(CollabraryContext);
    const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const router = useRouter();
    
    const handleBorrowClick = () => {
        sendLoanRequest().then(r => {
            setSuccessModalOpen(true);
        })
    };

    const sendLoanRequest = async () => {
        await collabraryContract.requestBookLoan(bookId, {from: userAddress});
    };

    const handleApproveLoanClick = () => {
        sendLoanApproval().then(r => {
            setSuccessModalOpen(true);
        })
    };

    const sendLoanApproval = async () => {
        return await collabraryContract.approveBookLoan(bookId, {from: userAddress});
    };

    return (
        <Layout>
            <PageHeader title="Book"></PageHeader>
            {book && <BookDetails book={book} />}
            {book && book.bookOwner != user.username && book.status == BookStatus.Available &&
                <Button onClick={handleBorrowClick}>Borrow</Button>
            }
            {book && book.bookOwner == user.username && book.status == BookStatus.LoanPending &&
                <Button onClick={handleApproveLoanClick}>Approve Loan</Button>
            }
            <SimpleModal
                isOpen={successModalOpen} 
                setOpen={setSuccessModalOpen}
                title="Success"
                content=""
                icon={SimpleModalIcons.Success}
                onRequestClose={() => router.push("/")}
            />
        </Layout>
    );
};

export default BookPage;