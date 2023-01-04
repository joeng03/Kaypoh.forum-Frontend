import { IUser, initialUserState } from "../user/types";
import { ITopic, initialTopicState } from "../topics/types";

export interface IPost {
    id: number;
    title: string;
    content: string;
    image: string;
    created_at: string;
    updated_at: string;
    user: IUser;
    topic: ITopic;
    stars_count: number;
}

//-1 is used as the default id for an empty IPost object as database ids are non-negative
export const initialPostState = {
    id: -1,
    title: "",
    content: "",
    stars: 0,
    image: "",
    created_at: "",
    updated_at: "",
    user: initialUserState,
    topic: initialTopicState,
    stars_count: 0,
};
