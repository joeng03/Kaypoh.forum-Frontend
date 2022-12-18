export interface ICredentials {
    email: string;
    password: string;
    username?: string;
}

export interface IUser {
    id: number;
    email: string;
    username: string;
    profilePic?: string;
    stars: number;
    bio: string;
    created_at: string;
    updated_at: string;
}

//-1 is used as the default id for an empty IUser object as database ids are non-negative
export const initialUserState: IUser = {
    id: -1,
    email: "",
    username: "",
    profilePic: "",
    stars: 0,
    bio: "",
    created_at: "",
    updated_at: "",
};
