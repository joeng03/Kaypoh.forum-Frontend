export interface ITopic {
    id: number;
    name: string;
    description: string;
}

export const initialTopicState = {
    id: -1,
    name: "",
    description: "",
};
