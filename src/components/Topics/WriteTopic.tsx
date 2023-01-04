import { acCreateTopic, acUpdateTopic } from "store/topics/action";
import { readOne } from "services/topics";
import { ITopic, initialTopicState } from "store/topics/types";
import Input from "components/Input";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const WriteTopic = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

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
    };

    return (
        <Box component="main" sx={{ mt: "3.5rem", width: "95vw", maxWidth: "s", display: "flex" }}>
            <Box
                component="form"
                onSubmit={handleWriteTopic}
                sx={{ width: "30vw", maxWidth: "s", margin: "0 auto" }}
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
                    rows={4}
                    required={false}
                    multiline
                ></Input>
            </Box>
            <Box></Box>
        </Box>
    );
};

export default WriteTopic;
