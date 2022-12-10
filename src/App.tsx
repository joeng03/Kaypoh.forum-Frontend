import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import Home from "./components/Home";
import Post from "./components/Posts/Post";

import SwitchModeButton from "./components/SwitchModeButton";
import "./App.css";
import store from "./store";

import PublishPost from "components/Posts/WritePost";
import React, { useState, useMemo, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { styled } from "@mui/material/styles";
import { red, indigo, deepPurple, yellow } from "@mui/material/colors";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import type { ThemeOptions, PaletteMode } from "@mui/material";

// TypeScript module augmentation for @mui/material/styles
declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        sm: false;
        md: false;
        lg: false;
        xxs: true;
        s: true;
        m: true;
        l: true;
        xxl: true;
    }

    interface Palette {
        star: Palette["primary"];
    }
    interface PaletteOptions {
        star: PaletteOptions["primary"];
    }
}

const breakpoints = {
    values: {
        xxs: 0,
        xs: 400,
        s: 600,
        m: 900,
        l: 1200,
        xl: 1600,
        xxl: 1800,
    },
};

const MediaQuery = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("m")]: {
        fontSize: "0.85rem",
    },
    [theme.breakpoints.down("s")]: {
        fontSize: "0.8rem",
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: "0.75rem",
    },
    [theme.breakpoints.up("m")]: {
        fontSize: "0.9rem",
    },
    [theme.breakpoints.up("l")]: {
        fontSize: "1rem",
    },
    [theme.breakpoints.up("xl")]: {
        fontSize: "1.1rem",
    },
    [theme.breakpoints.up("xxl")]: {
        fontSize: "1.2rem",
    },
}));

const lightTheme: ThemeOptions = {
    palette: {
        mode: "light",
        primary: indigo,
        secondary: deepPurple,
        warning: {
            main: red[700],
        },
        star: {
            main: yellow[600],
        },
    },
    breakpoints: breakpoints,
};
const darkTheme: ThemeOptions = {
    palette: {
        mode: "dark",
        warning: {
            main: red[200],
        },
        star: {
            main: yellow[400],
        },
        contrastThreshold: 4.5,
    },
    breakpoints: breakpoints,
};

interface ColorContextSchema {
    toggleColorMode: () => void;
}
export const ColorContext = createContext<ColorContextSchema>({} as ColorContextSchema);

const App: React.FC = () => {
    const [mode, setMode] = useState<PaletteMode>("dark");
    const theme = useMemo(() => createTheme(mode === "light" ? lightTheme : darkTheme), [mode]);
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        [],
    );

    return (
        <div className="App">
            <ColorContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <MediaQuery>
                        <CssBaseline enableColorScheme />
                        <SwitchModeButton />
                        <BrowserRouter>
                            <Provider store={store}>
                                <Routes>
                                    <Route path="/signup" element={<SignUp />} />
                                    <Route path="/" element={<Login />} />
                                    <Route
                                        path="/publishpost"
                                        element={<PublishPost method="create" post={undefined} />}
                                    />
                                    <Route path="/home" element={<Home />}></Route>
                                </Routes>
                            </Provider>
                        </BrowserRouter>
                    </MediaQuery>
                </ThemeProvider>
            </ColorContext.Provider>
        </div>
    );
};

export default App;
