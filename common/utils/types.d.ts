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
    title: string,
    author: string,
    description: string,
    genreId: number,
}

export { User, UserData, Book };