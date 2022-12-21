import { IUser, initialUserState } from "../user/types";

export interface IComment {
    id: number;
    post_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    user: IUser;
}

export const initialCommentState = {
    id: -1,
    post_id: -1,
    content: "",
    created_at: "",
    updated_at: "",
    user: initialUserState,
};
