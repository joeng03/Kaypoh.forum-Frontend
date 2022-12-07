import Input from "./Input";
import "../../App.css";
import { acUserSignUp } from "../../store/user/action";
import { useAppDispatch } from "../../store";
import { ICredentials } from "../../store/user/types";
import { validateUsername, validateEmail, validatePassword } from "../../utils/validators";
import { toastSignUpSuccess, toastSignUpError, toastFormat } from "utils/constants";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Container, Button, TextField, Grid, Box } from "@mui/material";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            CVWO {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const SignUp = (): JSX.Element => {
    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const credentials: ICredentials = {
            username,
            email,
            password,
        };
        dispatch(acUserSignUp(credentials))
            .then(() => toast.success(toastSignUpSuccess, toastFormat))
            .catch((err) => toast.error(toastSignUpError(err.response.data.errors), toastFormat));

        setUsername("");
        setEmail("");
        setPassword("");
    };

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [usernameErr, setUsernameErr] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

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

    const dispatch = useAppDispatch();

    return (
        <Container component="main" maxWidth="xs">
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
                <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 3 }}>
                    <Grid container>
                        <Input
                            id="Username"
                            label="Username"
                            name="Username"
                            autoComplete="given-name"
                            value={username}
                            setInput={setUsername}
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
                            setInput={setEmail}
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
                            setInput={setPassword}
                            setMessage={setPasswordErr}
                            validate={validatePassword}
                            message={passwordErr}
                        ></Input>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={btnDisabled}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to="/">Already have an account? Login</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
            <ToastContainer />
        </Container>
    );
};

export default SignUp;
