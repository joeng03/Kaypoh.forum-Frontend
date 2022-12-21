import { COMMENTS } from "../utils/endpoints";
import { IComment } from "../store/comments/types";
import axios from "axios";
import { transform } from "typescript";

const transformCommentRequest = (comment: IComment) => ({
    ...comment,
    user_id: comment.user.id,
    id: undefined,
    user: undefined,
    created_at: undefined,
    updated_at: undefined,
});

const create = async (comment: IComment): Promise<IComment> => {
    const response = await axios.post(COMMENTS, transformCommentRequest(comment));
    return response.data;
};

const readOne = async (id: number): Promise<IComment> => {
    const response = await axios.get(`${COMMENTS}/${id}`);
    return response.data;
};

const readAll = async (post_id: number): Promise<IComment[]> => {
    const config = {
        params: {
            post_id,
        },
    };
    const response = await axios.get(COMMENTS, config);
    return response.data;
};

const update = async (comment: IComment): Promise<IComment> => {
    const response = await axios.put(`${COMMENTS}/${comment.id}`, transformCommentRequest(comment));
    return response.data;
};

const remove = async (id: number): Promise<void> => {
    await axios.delete(`${COMMENTS}/${id}`);
};

const commentService = { create, readOne, readAll, update, remove };
export default commentService;
