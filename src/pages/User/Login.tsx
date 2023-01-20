import AppTypewriter from "../../components/UI/Effects/AppTypewriter";
import Input from "../../components/UI/Input/AppInput";
import Loading from "../../components/UI/General/Loading";
import { acUserLogin } from "../../store/user/action";
import { useAppDispatch } from "../../store";
import { ICredentials } from "../../store/user/types";
import { validateEmail, validatePassword } from "../../config/validators";
import { toastLoginError, toastFormat, toastLoginSuccess } from "config/constants";
import "react-toastify/dist/ReactToastify.css";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
        const inputIsInvalid: boolean = emailErr !== "" || passwordErr !== "" || email === "" || password === "";
        if (btnDisabled !== inputIsInvalid) {
            setBtnDisabled(inputIsInvalid);
        }
    }, [emailErr, passwordErr, email, password]);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const credentials: ICredentials = {
            email,
            password,
        };
        trackPromise(
            dispatch(acUserLogin(credentials))
                .then(() => {
                    toast.success(toastLoginSuccess, toastFormat);
                    navigate("/");
                })
                .catch(() => toast.error(toastLoginError, toastFormat)),
        );

        setEmail("");
        setPassword("");
    };
    return (
        <>
            <Container
                className="gradient-background"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <Slide direction="down" in={show} timeout={700}>
                    <Box className="noselect form" maxWidth="s">
                        <AppTypewriter />
                        <Typography component="h1" variant="h6" sx={{ fontFamily: "'Open Sans'" }}>
                            Login
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleLogin}
                            maxWidth="xs"
                            sx={{ mt: 3, width: "80vw" }}
                        >
                            <Input
                                placeholder="Email address"
                                autoComplete="email"
                                value={email}
                                setValue={setEmail}
                                setMessage={setEmailErr}
                                validate={validateEmail}
                                autoFocus
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
                                Login
                            </Button>
                            <Link to="/signup" style={{ color: "#005e97" }}>
                                {"Don't have an account yet? Sign Up"}
                            </Link>
                        </Box>
                    </Box>
                </Slide>
                <Loading type="circular" />
            </Container>
        </>
    );
};

export default Login;
