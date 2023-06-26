"use client";
import { FormEvent, ChangeEvent, useState } from "react";
import TextInput from "../TextInput";
import { Book } from "@/common/utils/types";
import genres from "../../common/utils/genres.json";
import GenreSelect from "../GenreSelect";
import Button from "../Button";

const AddBookForm = () => {
    const [newBook, setNewBook] = useState<Book>({
        title: "",
        author: "",
        description: "",
        genreId: -1
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewBook(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const handleAddBook = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <div>
            <form>
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
                <TextInput 
                    name="description"
                    value={newBook.description}
                    onChange={handleInputChange}
                    label="Description"
                />
                <Button
                    onClick={handleAddBook}
                >Add</Button>
            </form>
        </div>
    )
}

export default AddBookForm;
