import { IUser, initialUserState } from "../user/types";

export interface IPost {
    id: number;
    title: string;
    content: string;
    stars: number;
    tag: string;
    image: string;
    created_at: string;
    updated_at: string;
    user: IUser;
}

//-1 is used as the default id for an empty IPost object as database ids are non-negative
export const initialPostState = {
    id: -1,
    title: "",
    content: "",
    stars: 0,
    tag: "",
    image: "",
    created_at: "",
    updated_at: "",
    user: initialUserState,
};