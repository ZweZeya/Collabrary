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

enum BookStatus { 
    Available,
    Borrowed,
    LoanPending,
    ReturnPending
}

type Book = {
    title: string,
    author: string,
    genreId: number,
    status: BookStatus
}

export { User, UserData, Book, BookStatus };