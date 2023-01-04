import { IComment } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialCommentsState: IComment[] = [];

const commentsSlice = createSlice({
    name: "comments",
    initialState: initialCommentsState,
    reducers: {
        createComment(state, action) {
            state.push(action.payload);
        },
        setComments(state, action: PayloadAction<IComment[]>) {
            return action.payload;
        },

        updateComment(state, action: PayloadAction<IComment>) {
            const updatedComment = action.payload;
            state[state.findIndex((comment) => comment.id === updatedComment.id)] = updatedComment;
        },
        deleteComment(state, action: PayloadAction<number>) {
            const deletedComment_id = action.payload;
            state.splice(
                state.findIndex((comment) => comment.id === deletedComment_id),
                1,
            );
        },
    },
});
export const { createComment, setComments, updateComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
