import { IComment } from "./types";
import { createComment, setComments, updateComment, deleteComment } from "./reducer";
import commentService from "../../services/comments";
import { AppThunk } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";

export const acCreateComment = (comment: IComment): AppThunk<Promise<PayloadAction<IComment>>> => {
    return async (dispatch) => {
        const createdComment = await commentService.create(comment);
        return dispatch(createComment(createdComment));
    };
};

export const acSetComments = (post_id: number): AppThunk<Promise<PayloadAction<IComment[]>>> => {
    return async (dispatch) => {
        const comments = await commentService.readAll(post_id);
        return dispatch(setComments(comments));
    };
};

export const acUpdateComment = (comment: IComment): AppThunk<Promise<PayloadAction<IComment>>> => {
    return async (dispatch) => {
        const updatedComment = await commentService.update(comment);
        return dispatch(updateComment(updatedComment));
    };
};

export const acDeleteComment = (comment_id: number): AppThunk<Promise<PayloadAction<number>>> => {
    return async (dispatch) => {
        await commentService.remove(comment_id);
        return dispatch(deleteComment(comment_id));
    };
};
