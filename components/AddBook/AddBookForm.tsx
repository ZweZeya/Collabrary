"use client";
import { FormEvent, ChangeEvent, useState, useContext, Fragment } from "react";
import TextInput from "../TextInput";
import { Book } from "@/common/utils/types";
import GenreSelect from "../GenreSelect";
import Button from "../Button";
import { CollabraryContext } from "@/common/context/CollabraryContext";
import { UserContext } from "@/common/context/UserContext";
import FormErrorMsg from "../FormErrorMsg";
import SimpleModal, { SimpleModalIcons } from "../SimpleModal";

const AddBookForm = () => {
    const [newBook, setNewBook] = useState<Book>({
        title: "",
        author: "",
        genreId: -1
    })
    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const [isErrorMsgVisible, setErrorMsgVisible] = useState<boolean>(false);
    const { collabraryContract } = useContext(CollabraryContext);
    const { userData } = useContext(UserContext);
    const { userAddress } = userData;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewBook(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.name === "genreId" ? +e.target.value : e.target.value
            }
        });
    };

    const handleAddBook = (e: FormEvent) => {
        e.preventDefault();
        if (validateNewBook(newBook)) {
            addBook(newBook).then(r => {
                setSuccessModalOpen(true);
            });
        } else {
            setErrorMsgVisible(true);
        }
    };

    const validateNewBook = (book: Book): boolean => {
        return (
            book.title != "" &&
            book.author != "" &&
            book.genreId != -1
        );
    };

    const addBook = async (book: Book) => {
        await collabraryContract.addBook(book.title, book.author, book.genreId, {from: userAddress});
    };

    return (
        <Fragment>
            <div className="flex justify-center">
                <form className="flex flex-col gap-3 bg-indigo-100 items-center px-3 py-3 rounded-md">
                    <TextInput 
                        name="title"
                        value={newBook.title}
                        onChange={handleInputChange}
                        label="Title"
                    />
                    <TextInput 
                        name="author"
                        value={newBook.author}
                        onChange={handleInputChange}
                        label="Author"
                    />
                    <div className="flex flex-col">
                        <label className="font-medium">Genre</label>
                        <GenreSelect 
                            value={newBook.genreId}
                            onChange={handleInputChange}
                            name="genreId"
                            className="h-8 w-80"
                        />
                    </div>
                    <Button
                        onClick={handleAddBook}
                    >Add</Button>

                    <FormErrorMsg isOpen={isErrorMsgVisible} setOpen={setErrorMsgVisible}>
                        Missing Fields
                    </FormErrorMsg>

                </form>
            </div>
            <SimpleModal 
                isOpen={isSuccessModalOpen} 
                setOpen={setSuccessModalOpen} 
                title="Success"
                content="New book has been added." 
                icon={SimpleModalIcons.Success}
            />
        </Fragment>
    )
}

export default AddBookForm;
