import ContentEditor from "../../components/UI/Input/ContentEditor";
import PublishButton from "components/UI/Buttons/PublishButton";
import { ITopic, initialTopicState } from "store/topics/types";
import { acCreatePost, acUpdatePost } from "store/posts/action";
import { acSetTopics } from "store/topics/action";
import { readOne } from "services/posts";
import { useAppSelector, useAppDispatch } from "store";
import fetchBlob from "services/blob";
import { toastPublishSuccess, toastNotAuthorizedWarning, toastFormat } from "config/constants";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { stateToHTML } from "draft-js-export-html";

import { toast } from "react-toastify";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TextField from "@mui/material/TextField";

const WritePost = () => {
    const [title, setTitle] = useState<string>("");
    const [topic, setTopic] = useState<ITopic>(initialTopicState);
    const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
    const [image, setImage] = useState<File>();
    const postImage = useRef<HTMLImageElement>(null);

    const topics = useAppSelector((state) => state.topics);

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
                    setTopic(post.topic);
                    if (post.image) {
                        fetchBlob(post.image).then((blob) => {
                            const imageFile: File = new File([blob], "");
                            showAndSetImage(imageFile);
                        });
                    }
                })
                .catch(() => navigate("/notfound"));
        }
        trackPromise(dispatch(acSetTopics()));
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
        console.log(stateToHTML(editorState.getCurrentContent()));
        postFormData.append("post[topic_id]", topic.id === -1 ? topics[0].id.toString() : topic.id.toString());

        if (image) {
            postFormData.append("post[image]", image as Blob);
        }

        trackPromise(
            (id ? dispatch(acUpdatePost(postFormData, Number(id))) : dispatch(acCreatePost(postFormData)))
                .then(() => {
                    toast.success(toastPublishSuccess("post"), toastFormat);
                    navigate("/");
                })
                .catch(() => {
                    toast.warning(toastNotAuthorizedWarning, toastFormat);
                    navigate("/");
                }),
        );
    };
    return (
        <Container component="main" maxWidth="m" sx={{ m: "5rem auto", width: "95vw", height: "80vh" }}>
            <Box component="form" noValidate onSubmit={handlePublishPost}>
                <TextField
                    placeholder="Title"
                    variant="standard"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    InputProps={{ disableUnderline: true }}
                    sx={{ p: "0rem 1rem 1rem 1rem" }}
                    fullWidth
                ></TextField>
                <Autocomplete
                    size="small"
                    value={topic}
                    onChange={(event, newTopic) => {
                        if (newTopic) {
                            setTopic(newTopic);
                        }
                    }}
                    options={topics}
                    getOptionLabel={(topic) => topic.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            placeholder="Topic"
                            sx={{ p: "0rem 1rem 2rem 1rem" }}
                            fullWidth
                        />
                    )}
                    disablePortal
                />
                <ContentEditor
                    editorState={editorState}
                    setEditorState={setEditorState}
                    placeholder="Tell your story..."
                />
                <Box component="img" width="100%" ref={postImage} sx={{ display: "block", pb: "0.5rem" }}></Box>
                <Box display="block" position="relative" mb="5rem">
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
                    <PublishButton />
                </Box>
            </Box>
        </Container>
    );
};

export default WritePost;
