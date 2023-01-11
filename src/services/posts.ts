import { POSTS } from "../utils/endpoints";
import { IPost } from "../store/posts/types";
import axios from "axios";

const create = async (post: FormData): Promise<IPost> => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const response = await axios.post(POSTS, post, config);
    return response.data;
};

export const readOne = async (id: number): Promise<IPost> => {
    const response = await axios.get(`${POSTS}/${id}`);
    return response.data;
};

const readAll = async (page: number, columnName: string, searchValue: string, sortBy: string): Promise<IPost[]> => {
    const config = {
        params: {
            columnName,
            searchValue,
            sortBy,
            topics: localStorage.getItem("subscribedTopics")
                ? JSON.parse(localStorage.getItem("subscribedTopics") as string)
                : [],
        },
    };
    const response = await axios.get(`${POSTS}/page/${page}`, config);
    return response.data;
};

const update = async (post: FormData, id: number): Promise<IPost> => {
    const response = await axios.put(`${POSTS}/${id}`, post, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

const remove = async (id: number): Promise<void> => {
    await axios.delete(`${POSTS}/${id}`);
};

const postService = { create, readOne, readAll, update, remove };
export default postService;
