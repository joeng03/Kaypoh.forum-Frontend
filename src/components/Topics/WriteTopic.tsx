import { acCreateTopic, acUpdateTopic } from "store/topics/action";
import { useAppDispatch } from "store";
import { readOne } from "services/topics";
import { ITopic, initialTopicState } from "store/topics/types";
import { toastPublishSuccess, toastNotAuthorizedWarning, toastFormat } from "utils/constants";
import Input from "components/Input";
import PublishButton from "components/PublishButton";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const WriteTopic = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    //if id is undefined, this is a "create" process, else it is an "update" process

    useEffect(() => {
        if (id) {
            readOne(Number(id))
                .then((topic) => {
                    setName(topic.name);
                    setDescription(topic.description);
                })
                .catch(() => navigate("/notfound"));
        }
    }, []);

    const handleWriteTopic = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const topic: ITopic = {
            ...initialTopicState,
            id: Number(id),
            name,
            description,
        };

        (id ? dispatch(acUpdateTopic(topic)) : dispatch(acCreateTopic(topic)))
            .then(() => {
                toast.success(toastPublishSuccess("topic"), toastFormat);
                navigate("/forumtopics");
            })
            .catch(() => {
                toast.warning(toastNotAuthorizedWarning, toastFormat);
                navigate("/forumtopics");
            });
    };

    return (
        <Box component="main" sx={{ m: "8rem auto 0rem", width: "95vw", maxWidth: "s" }}>
            <Box
                component="form"
                onSubmit={handleWriteTopic}
                sx={{ margin: "0 auto", position: "relative" }}
                noValidate
            >
                <Input
                    placeholder="Topic name"
                    value={name}
                    setValue={setName}
                    setMessage={() => ""}
                    validate={() => ""}
                    message={""}
                    required
                ></Input>
                <Input
                    placeholder="Description"
                    value={description}
                    setValue={setDescription}
                    setMessage={() => ""}
                    validate={() => ""}
                    message={""}
                    rows={5}
                    required={false}
                    multiline
                ></Input>
                <PublishButton />
            </Box>
        </Box>
    );
};

export default WriteTopic;
