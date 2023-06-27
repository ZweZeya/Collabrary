"use client";
import { FormEvent, ChangeEvent, useState } from "react";
import TextInput from "../TextInput";
import { Book } from "@/common/utils/types";
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
        });
    };

    const handleAddBook = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
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
                <TextInput 
                    name="description"
                    value={newBook.description}
                    onChange={handleInputChange}
                    label="Description"
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
            </form>
        </div>
    )
}

export default AddBookForm;
