import { BookStatus } from "./enum";

type User = {
    username: string,
    firstName: string,
    lastName: string,
    email: string
    // isRegistered?: boolean,
}

type UserData = {
    AuthContract: any,
    userAddress: string,
    user: any,
}

type Book = {
    id: number,
    title: string,
    author: string,
    genreId: number,
    status: BookStatus,
    bookOwner: string,
    bookLoaner: string,
}

export { User, UserData, Book };