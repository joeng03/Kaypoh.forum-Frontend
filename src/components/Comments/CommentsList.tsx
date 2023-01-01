import CommentCard from "./CommentCard";
import { useAppDispatch, useAppSelector } from "store";
import { IComment, initialCommentState } from "store/comments/types";
import { acSetComments } from "store/comments/action";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";

const CommentsList = () => {
    const { id } = useParams();
    const post_id = Number(id);

    const user = useAppSelector((state) => state.user);
    const comments = useAppSelector((state) => state.comments);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(acSetComments(post_id));
    }, []);

    const comment: IComment = {
        ...initialCommentState,
        post_id,
        user,
    };

    return (
        // <>
        //     {" "}
        //     <CommentCard comment={comment} method="create" />
        //     {comments.map((comment) => (
        //         <CommentCard key={comment.id} comment={comment} method="update" />
        //     ))}
        // </>
        // display: flex;
        // flex-direction: column;
        // row-gap: 1rem;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        // max-width: 400px;
        // width: 90vw;
        // background-color: white;
        // border-radius: .5rem!important;
        // box-shadow: 24%;
        // padding:2rem;

        // <Fade in timeout={{ enter: 700, exit: 400 }}>
        <Box
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
        // </Fade>
    );
};

export default CommentsList;
