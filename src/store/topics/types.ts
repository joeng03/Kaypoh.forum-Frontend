export interface ITopic {
    id: number;
    name: string;
    description: string;
    username: string;
    posts_count: number;
    created_at: string;
}

export const initialTopicState = {
    id: -1,
    name: "",
    description: "",
    username: "",
    posts_count: 0,
    created_at: "",
};
