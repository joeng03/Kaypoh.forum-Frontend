import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import Post from "./components/Posts/Post";
import { SwitchModeButton } from "./components/SwitchModeButton";
import "./App.css";
import store from "./store";
import { clientId } from "utils/constants";

import React, { useState, useMemo, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { styled } from "@mui/material/styles";
import { red, indigo, deepPurple, grey } from "@mui/material/colors";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import type { ThemeOptions, PaletteMode } from "@mui/material";

type PostProps = {
    id: number;
    user_id: number;
    title: string;
    content: string;
    reputation: number;
    tag: string;
    image: string;
    created_at: Date;
    updated_at: Date;
};

const postProps: PostProps = {
    id: 1,
    user_id: 2,
    title: "Redux Flux Architecture",
    content:
        "In the past, present and future, we think a lot about bugs. Pearl Buck observed that, 'Every great mistake has a halfway moment, a split second when it can be recalled and perhaps remedied.' I hope that this quote will give some inspiration to the readers. What are the possible scenarios when bugs occurs or does not occur? Meanwhile, considering the importance of bugs, it is understandable that many people would be hesitant to make changes to the system. For instance, generally speaking, we have to consider many points of view about bugs before forming our own opinions. In our lives, when the discussion of bugs emerges, we have to adapt to the reality of its existence. However, this is still not the most important question in our discussion about bugs.",
    reputation: 69,
    tag: "TypeScript",
    image: "https://www.freecodecamp.org/news/content/images/2022/06/2.png",
    created_at: new Date(),
    updated_at: new Date(),
};

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
    },
    breakpoints: breakpoints,
};
const darkTheme: ThemeOptions = {
    palette: {
        mode: "dark",
        warning: {
            main: red[200],
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
                                    <Route path="/post" element={<Post {...postProps} />} />
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
