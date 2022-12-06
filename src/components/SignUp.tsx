import Input from "./Input";
import "../App.css";
import { acGoogleSignIn, acUserSignUp } from "../store/user/action";
import { RootState, useAppSelector, useAppDispatch } from "../store";
import { ICredentials, IUser } from "../store/user/types";
import { validateUsername, validateEmail, validatePassword } from "../utils/validators";
import { toastSignUpSuccess, toastSignUpError, toastFormat } from "utils/constants";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Container, Button, TextField, Grid, Box, useTheme } from "@mui/material";
import jwt_decode from "jwt-decode";

import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import type { CodeResponse, TokenResponse, CredentialResponse } from "@react-oauth/google";

// import Avatar from "@mui/material/Avatar";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";

//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
/*
<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
*/

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
    const theme = useTheme();
    const login = useGoogleLogin({
        onSuccess: (tokenResponse: TokenResponse) => {
            console.log(tokenResponse);
            dispatch(acGoogleSignIn(tokenResponse));
        },
    });

    const handleGoogleResponse = (res: CredentialResponse) => {
        console.log(res);
        // if (res.credential) {
        //     const userProfile: IGoogleUserProfile = jwt_decode(res.credential);
        //     const user: IUser = {
        //         username: userProfile.name,
        //         email: userProfile.email,
        //         token: res.credential,
        //         profilePic: userProfile.picture,
        //     };
        //     console.log(JSON.stringify(user));
        //     dispatch(acSetUser(user));
        // }
        // if ("accessToken" in res) {
        //     const profileObj = res.profileObj;
        //     const user: IUser = {
        //         username: profileObj.name,
        //         email: profileObj.email,
        //         token: res.tokenId,
        //         profilePic: profileObj.imageUrl,
        //     };
        //     dispatch(acSetUser(user));
        // }
    };

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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            setInput={setPassword}
                            setMessage={setPasswordErr}
                            validate={validatePassword}
                            message={passwordErr}
                        ></Input>
                        {
                            <>
                                <Button onClick={() => login()}>Sign up with Google</Button>
                                {/* <Grid item xs={12} sx={{ display: "flex" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mr: "0.5rem" }}>
                                        <Typography component="p">Sign Up With</Typography>
                                    </Box>
                                    <div id="test" style={{ width: "400px" }}>
                                        <GoogleLogin size="medium" onSuccess={handleGoogleResponse} />
                                    </div>
                                </Grid> */}
                            </>
                        }
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
