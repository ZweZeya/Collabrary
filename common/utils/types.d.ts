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

export { User, UserData };