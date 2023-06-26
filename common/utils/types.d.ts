type User = {
    username: string,
    firstName: string,
    lastName: string,
    email: string
}

type UserData = {
    AuthContract: any,
    isRegistered: boolean,
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