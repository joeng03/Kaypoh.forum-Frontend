import CommentCard from "../../components/Comments/CommentCard";
import { useAppDispatch, useAppSelector } from "store";
import { IComment, initialCommentState } from "store/comments/types";
import { acSetComments } from "store/comments/action";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import Box from "@mui/material/Box";

const CommentsList = () => {
    const { id } = useParams();
    const post_id = Number(id);

    const commentsRef = useRef<HTMLDivElement>(null);
    const user = useAppSelector((state) => state.user);
    const comments = useAppSelector((state) => state.comments);
    const dispatch = useAppDispatch();

    useEffect(() => {
        trackPromise(dispatch(acSetComments(post_id)));
        if (commentsRef.current) {
            commentsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    const comment: IComment = {
        ...initialCommentState,
        post_id,
        user,
    };

    return (
        <Box
            ref={commentsRef}
            sx={{
                margin: "3.5rem 0rem",
                maxWidth: "m",
            }}
        >
            <CommentCard comment={comment} method="create" />
            {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} method="update" />
            ))}
        </Box>
    );
};

export default CommentsList;
