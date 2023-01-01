import Input from "../Input";
import "../../App.css";
import { acUserSignUp } from "../../store/user/action";
import { useAppDispatch } from "../../store";
import { ICredentials } from "../../store/user/types";
import { validateUsername, validateEmail, validatePassword } from "../../utils/validators";
import { acSetPosts } from "store/posts/action";
import { toastSignUpSuccess, toastSignUpError, toastFormat } from "utils/constants";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

const SignUp = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [usernameErr, setUsernameErr] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
    const [show, setShow] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setShow(true);
    }, []);
    useEffect(() => {
        const inputIsInvalid =
            usernameErr !== "" ||
            emailErr !== "" ||
            passwordErr !== "" ||
            username === "" ||
            email === "" ||
            password === "";
        if (btnDisabled !== inputIsInvalid) {
            setBtnDisabled(inputIsInvalid);
        }
    }, [usernameErr, emailErr, passwordErr, username, email, password]);

    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const credentials: ICredentials = {
            username,
            email,
            password,
        };
        dispatch(acUserSignUp(credentials))
            .then(() => {
                dispatch(acSetPosts());
                toast.success(toastSignUpSuccess, toastFormat);
                navigate("/");
            })
            .catch((err) => toast.error(toastSignUpError(err.response.data.errors), toastFormat));

        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <Container className="container" sx={{ display: "flex" }}>
            <Slide direction="up" in={show} timeout={650}>
                <Box className="noselect form" maxWidth="s">
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>

                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSignUp}
                        maxWidth="xs"
                        sx={{ mt: 3, width: "80vw" }}
                    >
                        <Input
                            id="Username"
                            label="Username"
                            name="Username"
                            autoComplete="given-name"
                            value={username}
                            setValue={setUsername}
                            setMessage={setUsernameErr}
                            validate={validateUsername}
                            autoFocus
                            message={usernameErr}
                        ></Input>
                        <Input
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            setValue={setEmail}
                            setMessage={setEmailErr}
                            validate={validateEmail}
                            message={emailErr}
                        ></Input>
                        <Input
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            setValue={setPassword}
                            setMessage={setPasswordErr}
                            validate={validatePassword}
                            message={passwordErr}
                        ></Input>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={btnDisabled}
                        >
                            Sign Up
                        </Button>
                        <Link to="/login" style={{ color: "#005e97" }}>
                            Already have an account? Login
                        </Link>
                    </Box>
                </Box>
            </Slide>
        </Container>
    );
};

export default SignUp;
