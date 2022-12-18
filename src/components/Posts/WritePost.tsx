import PostInput from "./PostInput";
import ContentEditor from "./ContentEditor";
import Loading from "components/Loading";
import { IUser } from "store/user/types";
import { IPost } from "store/posts/types";
import { acCreatePost, acUpdatePost } from "store/posts/action";
import { useAppSelector, useAppDispatch } from "store";
import fetchBlob from "services/blob";
import { toastPublishPostSuccess, toastNotAuthorizedWarning, toastFormat } from "utils/constants";
import { BASE_URL } from "utils/endpoints";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";

type WritePostProps = {
    post: IPost;
};
const WritePost = ({ post }: WritePostProps): JSX.Element => {
    const [title, setTitle] = useState<string>("");
    const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
    const [tag, setTag] = useState<string>("");
    const [image, setImage] = useState<File>();
    const postImage = useRef<HTMLImageElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        if (id) {
            setTitle(post.title);
            setEditorState(() => EditorState.createWithContent(convertFromHTML((post as IPost).content)));
            setTag(post.tag);
            if (post.image) {
                fetchBlob(post.image).then((blob) => {
                    const imageFile: File = new File([blob], "");
                    showAndSetImage(imageFile);
                });
            }
        }
    }, [post]);

    const showAndSetImage = (file: File) => {
        if (postImage.current) {
            postImage.current.src = URL.createObjectURL(file);
        }
        setImage(file);
    };

    const handlePublishPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const postFormData = new FormData();

        /*
        The postFormData keys follow the Rails parameter naming conventions
        https://guides.rubyonrails.org/v3.2.13/form_helpers.html#understanding-parameter-naming-conventions
        */
        postFormData.append("post[title]", title);
        postFormData.append("post[content]", convertToHTML(editorState.getCurrentContent()));
        postFormData.append("post[stars]", post ? post.stars.toString() : "0");
        postFormData.append("post[tag]", tag);
        if (image) {
            postFormData.append("post[image]", image as Blob);
        }
        postFormData.append("post[user_id]", user!.id.toString());

        (id ? dispatch(acUpdatePost(postFormData, post.id, "write")) : dispatch(acCreatePost(postFormData)))
            .then(() => {
                toast.success(toastPublishPostSuccess, toastFormat);
                navigate("/");
            })
            .catch(() => {
                toast.warning(toastNotAuthorizedWarning, toastFormat);
                navigate("/");
            });
    };

    return id && post.id === -1 ? (
        <Loading />
    ) : (
        <Container component="main" maxWidth="s" sx={{ mt: 8, mb: 8, width: "95vw" }}>
            <Box component="form" noValidate onSubmit={handlePublishPost} width="100%">
                <Grid container spacing={1} direction="column">
                    <Grid item xs={1}>
                        <PostInput value={title} setValue={setTitle} placeholder="Title" />
                        <PostInput value={tag} setValue={setTag} placeholder="Tag" />
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
