import PostInput from "./PostInput";
import ContentEditor from "../ContentEditor";
import Loading from "components/Loading";
import { IPost, initialPostState } from "store/posts/types";
import { acCreatePost, acUpdatePost } from "store/posts/action";
import { readOne } from "services/posts";
import { useAppSelector, useAppDispatch } from "store";
import fetchBlob from "services/blob";
import { toastPublishSuccess, toastNotAuthorizedWarning, toastFormat } from "utils/constants";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SendIcon from "@mui/icons-material/Send";

const WritePost = () => {
    const [title, setTitle] = useState<string>("");
    const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
    const [topicID, setTopicID] = useState<number>(-1);
    const [image, setImage] = useState<File>();
    const [loading, setLoading] = useState<boolean>(true);
    const postImage = useRef<HTMLImageElement>(null);

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    //if id is undefined, this is a "create" process, else it is an "update" process
    useEffect(() => {
        if (id) {
            readOne(Number(id))
                .then((post) => {
                    setTitle(post.title);
                    setEditorState(() => EditorState.createWithContent(convertFromHTML(post.content)));
                    setTopicID(post.topic.id);
                    if (post.image) {
                        fetchBlob(post.image).then((blob) => {
                            const imageFile: File = new File([blob], "");
                            showAndSetImage(imageFile);
                        });
                    }
                    setLoading(false);
                })
                .catch(() => navigate("/notfound"));
        } else {
            setLoading(false);
        }
    }, []);

    const showAndSetImage = (file: File) => {
        if (postImage.current) {
            postImage.current.src = URL.createObjectURL(file);
        }
        setImage(file);
    };

    const handlePublishPost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const postFormData = new FormData();

        /*
        The postFormData keys follow the Rails parameter naming conventions
        https://guides.rubyonrails.org/v3.2.13/form_helpers.html#understanding-parameter-naming-conventions
        */
        postFormData.append("post[title]", title);
        postFormData.append("post[content]", convertToHTML(editorState.getCurrentContent()));

        postFormData.append("post[topic_id]", topicID.toString());

        postFormData.append("post[user_id]", user.id.toString());

        if (image) {
            postFormData.append("post[image]", image as Blob);
        }

        (id ? dispatch(acUpdatePost(postFormData, Number(id))) : dispatch(acCreatePost(postFormData)))
            .then(() => {
                toast.success(toastPublishSuccess("post"), toastFormat);
                navigate("/");
            })
            .catch(() => {
                toast.warning(toastNotAuthorizedWarning, toastFormat);
                navigate("/");
            });
    };

    return loading ? (
        <Loading />
    ) : (
        <Container component="main" maxWidth="s" sx={{ mt: 8, mb: 8, width: "95vw" }}>
            <Box component="form" noValidate onSubmit={handlePublishPost} width="100%">
                <Grid container spacing={1} direction="column">
                    <Grid item xs={1}>
                        <PostInput value={title} setValue={setTitle} placeholder="Title" />
                        {/* <PostInput value={topicID} setValue={setTopicID} placeholder="Tag" /> */}
                    </Grid>
                    <Grid item xs={9}>
                        <ContentEditor
                            editorState={editorState}
                            setEditorState={setEditorState}
                            placeholder="Tell your story..."
                        />
                    </Grid>
                    <Grid item xs={2} sx={{ position: "relative", mb: 8 }}>
                        <Box component="img" width="100%" ref={postImage} sx={{ display: "block", pb: "0.5rem" }}></Box>
                        <Button
                            component="label"
                            variant="outlined"
                            size="small"
                            endIcon={<FileUploadOutlinedIcon />}
                            sx={{ position: "absolute", left: "0.7rem" }}
                        >
                            Upload Image
                            <input
                                accept="image/*"
                                type="file"
                                onChange={({ target }) => showAndSetImage((target.files as FileList)[0])}
                                hidden
                            />
                        </Button>
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
        </Container>
    );
};

export default WritePost;
