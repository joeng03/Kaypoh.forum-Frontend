import { IUser, initialUserState } from "../user/types";

export interface IComment {
    id: number;
    post_id: number;
    content: string;
    user: IUser;
    created_at: string;
    updated_at: string;
}

export const initialCommentState = {
    id: -1,
    post_id: -1,
    content: "",
    user: initialUserState,
    created_at: "",
    updated_at: "",
};
