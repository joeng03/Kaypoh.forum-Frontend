export interface ICredentials {
    username?: string;
    email: string;
    password: string;
}

export interface IUser {
    username: string;
    email: string;
    token: string;
    profilePic?: string;
}
