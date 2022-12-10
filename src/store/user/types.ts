export interface ICredentials {
    email: string;
    password: string;
    username?: string;
}

export interface IUser {
    token: string;
    id: number;
    email: string;
    username: string;
    profilePic?: string;
    stars: number;
    bio: string;
    created_at: Date;
    updated_at: Date;
}
