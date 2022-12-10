import AuthInput from "./AuthInput";
import { acUserLogin } from "../../store/user/action";
import { useAppDispatch } from "../../store";
import { ICredentials } from "../../store/user/types";
import { validateEmail, validatePassword } from "../../utils/validators";
import { toastLoginError, toastFormat, toastLoginSuccess } from "utils/constants";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Box, Container, Grid, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";

const Login = (): JSX.Element => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");
    const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
    const [show, setShow] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setShow(true);
    }, []);

    useEffect(() => {
        const inputIsInvalid: boolean = emailErr !== "" || passwordErr !== "" || email === "" || password === "";
        if (btnDisabled !== inputIsInvalid) {
            setBtnDisabled(inputIsInvalid);
        }
    }, [emailErr, passwordErr, email, password]);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const credentials: ICredentials = {
            email,
            password,
        };
        dispatch(acUserLogin(credentials))
            .then(() => toast.success(toastLoginSuccess, toastFormat))
            .catch(() => toast.error(toastLoginError, toastFormat));

        setEmail("");
        setPassword("");
    };

    return (
        <Slide direction="right" in={show} timeout={600}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        mt: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "none",
                    }}
                >
                    {" "}
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
                        <Grid container spacing={0.5}>
                            <AuthInput
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                setValue={setEmail}
                                setMessage={setEmailErr}
                                validate={validateEmail}
                                autoFocus
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={btnDisabled}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link to="/signup">{"Don't have an account yet? Sign Up"}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <ToastContainer />
            </Container>
        </Slide>
    );
};

export default Login;
