import { IPost } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialPostsState: IPost[] = [];

const postsSlice = createSlice({
    name: "posts",
    initialState: initialPostsState,
    reducers: {
        createPost(state, action) {
            state.push(action.payload);
        },
        setPosts(state, action: PayloadAction<IPost[]>) {
            return action.payload;
        },
        updatePost(state, action: PayloadAction<IPost>) {
            const updatedPost = action.payload;
            console.log(updatedPost);
            state[state.findIndex((post) => post.id === updatedPost.id)] = updatedPost;
        },
        deletePost(state, action: PayloadAction<number>) {
            const deletedPost_id = action.payload;
            state.splice(
                state.findIndex((post) => post.id === deletedPost_id),
                1,
            );
        },
    },
});
export const { createPost, setPosts, updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
