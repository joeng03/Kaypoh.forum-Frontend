import { IPost } from "./types";
import { createPost, setPosts, updatePost, deletePost } from "./reducer";
import postService from "../../services/posts";
import { AppThunk } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";

export const acCreatePost = (post: FormData): AppThunk<Promise<PayloadAction<IPost>>> => {
    return async (dispatch) => {
        const createdPost = await postService.create(post);
        return dispatch(createPost(createdPost));
    };
};

export const acSetPosts = (): AppThunk<Promise<PayloadAction<IPost[]>>> => {
    return async (dispatch) => {
        const posts = await postService.readAll();
        return dispatch(setPosts(posts));
    };
};

export const acUpdatePost = (post: FormData, post_id: number): AppThunk<Promise<PayloadAction<IPost>>> => {
    return async (dispatch) => {
        const updatedPost = await postService.update(post, post_id);
        return dispatch(updatePost(updatedPost));
    };
};

export const acdeletePost = (post_id: number): AppThunk<Promise<PayloadAction<number>>> => {
    return async (dispatch) => {
        await postService.remove(post_id);
        return dispatch(deletePost(post_id));
    };
};
