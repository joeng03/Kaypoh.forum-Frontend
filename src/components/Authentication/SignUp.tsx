import Input from "../Input";
import "../../App.css";
import { acUserSignUp } from "../../store/user/action";
import { useAppDispatch } from "../../store";
import { ICredentials } from "../../store/user/types";
import { validateUsername, validateEmail, validatePassword } from "../../utils/validators";
import { toastSignUpSuccess, toastSignUpError, toastFormat } from "utils/constants";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { trackPromise } from "react-promise-tracker";
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
        trackPromise(
            dispatch(acUserSignUp(credentials))
                .then(() => {
                    toast.success(toastSignUpSuccess, toastFormat);
                    navigate("/");
                })
                .catch((err) => toast.error(toastSignUpError(err.response.data.errors), toastFormat)),
        );

        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <Container className="gradient-background" sx={{ display: "flex" }}>
            <Slide direction="up" in={show} timeout={650}>
                <Box className="noselect form" maxWidth="s" sx={{ height: "80vh" }}>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            fontFamily: "'Open Sans'",
                        }}
                    >
                        Welcome to Kaypoh.forum
                    </Typography>
                    <Typography component="h1" variant="h6">
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
                            placeholder="Username"
                            autoComplete="username"
                            value={username}
                            setValue={setUsername}
                            setMessage={setUsernameErr}
                            validate={validateUsername}
                            autoFocus
                            message={usernameErr}
                        ></Input>
                        <Input
                            placeholder="Email address"
                            autoComplete="email"
                            value={email}
                            setValue={setEmail}
                            setMessage={setEmailErr}
                            validate={validateEmail}
                            message={emailErr}
                        ></Input>
                        <Input
                            placeholder="Password"
                            autoComplete="password"
                            type="password"
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
                        <div style={{ height: "2rem" }}></div>
                        <Link to="/codeofconduct" style={{ color: "#005e97" }}>
                            <p style={{ fontSize: "0.85rem" }}>
                                By signing up for an account, you have read and agree to our{" "}
                                <b>Citizen Code of Conduct</b>.
                            </p>
                        </Link>
                    </Box>
                </Box>
            </Slide>
        </Container>
    );
};

export default SignUp;
