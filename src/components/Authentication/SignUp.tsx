import AuthInput from "./AuthInput";
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
import { Typography, Container, Button, TextField, Grid, Box } from "@mui/material";
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
        <Slide direction="up" in={show} timeout={650}>
            <Container component="main">
                <Box
                    sx={{
                        mt: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
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
                        <AuthInput
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
                        ></AuthInput>
                        <AuthInput
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            setValue={setEmail}
                            setMessage={setEmailErr}
                            validate={validateEmail}
                            message={emailErr}
                        ></AuthInput>
                        <AuthInput
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
                        ></AuthInput>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={btnDisabled}
                        >
                            Sign Up
                        </Button>
                        <Link to="/login">Already have an account? Login</Link>
                    </Box>
                </Box>
            </Container>
        </Slide>
    );
};

export default SignUp;
