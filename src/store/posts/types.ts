import { IUser } from "../user/types";

export interface IPost {
    id: number;
    title: string;
    content: string;
    stars: number;
    tag: string;
    image: string;
    created_at: Date;
    updated_at: Date;
    user: IUser;
}
