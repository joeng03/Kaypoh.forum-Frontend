import ContentEditor from "../ContentEditor";
import { IComment } from "store/comments/types";
import { acCreateComment, acUpdateComment } from "store/comments/action";
import { useAppDispatch } from "store";
import { toastPublishSuccess, toastNotAuthorizedWarning, toastFormat } from "utils/constants";

import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

type WriteCommentProps = {
    comment: IComment;
    method: "create" | "update";
    onCancel: () => void;
};

const WriteComment = ({ comment, method, onCancel }: WriteCommentProps) => {
    const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (method === "update") {
            setEditorState(() => EditorState.createWithContent(convertFromHTML(comment.content)));
        }
    }, []);

    const handlePublishComment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const currentComment: IComment = {
            ...comment,
            content: convertToHTML(editorState.getCurrentContent()),
        };
        console.log(currentComment);
        (method === "update"
            ? dispatch(acUpdateComment(currentComment)).then(() => {
                  toast.success(toastPublishSuccess("comment"), toastFormat);
                  onCancel();
              })
            : dispatch(acCreateComment(currentComment))
        )
            .then(() => {
                toast.success(toastPublishSuccess("comment"), toastFormat);
            })

            .catch(() => {
                toast.warning(toastNotAuthorizedWarning, toastFormat);
            });
    };

    return (
        <Box component="form" noValidate onSubmit={handlePublishComment}>
            <Grid container spacing={1} direction="column">
                <Grid item xs={10} position="relative">
                    <ContentEditor
                        editorState={editorState}
                        setEditorState={setEditorState}
                        placeholder="Add comment..."
                    />
                </Grid>
                <Grid item xs={2} sx={{ position: "relative" }}>
                    {method === "update" && (
                        <Button
                            component="label"
                            variant="outlined"
                            size="small"
                            color="warning"
                            endIcon={<CancelIcon sx={{ color: "icon.cancel" }} />}
                            sx={{
                                position: "absolute",
                                left: "0.7rem",
                            }}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        endIcon={<SendIcon />}
                        sx={{ m: "0 auto", position: "absolute", right: "0.2rem" }}
                    >
                        Publish
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WriteComment;
