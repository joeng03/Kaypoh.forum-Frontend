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

const readOne = async (id: number): Promise<IPost> => {
    const response = await axios.get(`${POSTS}/${id}`);
    return response.data;
};

const readAll = async (): Promise<IPost[]> => {
    const response = await axios.get(POSTS);
    return response.data;
};

const update = async (post: IPost | FormData, id: number, type: string): Promise<IPost> => {
    const config = {
        params: {
            type: type,
        },
    };

    //check type of post
    if (Object.prototype.hasOwnProperty.call(post, "id")) {
        const transformedRequest = {
            ...post,
            user_id: (post as IPost).user.id,
            id: undefined,
            user: undefined,
            created_at: undefined,
            updated_at: undefined,
        };
        const response = await axios.put(`${POSTS}/${id}`, transformedRequest, config);
        return response.data;
    } else {
        const response = await axios.put(`${POSTS}/${id}`, post, {
            ...config,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
};

const remove = async (id: number): Promise<void> => {
    await axios.delete(`${POSTS}/${id}`);
};

const postService = { create, readOne, readAll, update, remove };
export default postService;
