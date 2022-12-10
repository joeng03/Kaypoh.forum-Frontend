import { getToken } from "./token";
import { POSTS } from "../utils/endpoints";
import { IPost } from "../store/posts/types";
import axios from "axios";

const create = async (post: FormData): Promise<IPost> => {
    const formDataHeaders = {
        headers: {
            ...getToken().headers,
            "Content-Type": "multipart/form-data",
        },
    };
    const response = await axios.post(POSTS, post, formDataHeaders);
    return response.data;
};

const readOne = async (id: number): Promise<IPost> => {
    const response = await axios.get(`${POSTS}/${id}`, getToken());
    return response.data;
};

const readAll = async (): Promise<IPost[]> => {
    const response = await axios.get(POSTS, getToken());
    return response.data;
};

const update = async (post: FormData, id: number): Promise<IPost> => {
    const formDataHeaders = {
        headers: {
            ...getToken().headers,
            "Content-Type": "multipart/form-data",
        },
    };
    const response = await axios.put(`${POSTS}/${id}`, post, formDataHeaders);
    return response.data;
};

const remove = async (id: number): Promise<void> => {
    await axios.delete(`${POSTS}/${id}`, getToken());
};

const postService = { create, readOne, readAll, update, remove };
export default postService;
