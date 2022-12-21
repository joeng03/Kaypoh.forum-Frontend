import { useAppDispatch, useAppSelector } from "./store";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import PostsList from "./components/Posts/PostsList";
import ViewPost from "./components/Posts/ViewPost";
import { IPost, initialPostState } from "./store/posts/types";
import CommentsList from "components/Comments/CommentsList";
import WriteComment from "components/Comments/WriteComment";
import CommentCard from "components/Comments/CommentCard";
import { initialCommentState } from "store/comments/types";
import { initialUserState } from "store/user/types";

import RequireAuth from "components/Authentication/RequireAuth";
import WritePost from "components/Posts/WritePost";
import "./App.css";
import { acSetPosts } from "store/posts/action";

import React, { useState, useEffect, useMemo, createContext } from "react";
import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { styled } from "@mui/material/styles";
import { red, indigo, deepPurple, yellow, grey, amber } from "@mui/material/colors";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import type { ThemeOptions, PaletteMode, PaletteColor, PaletteColorOptions } from "@mui/material";

// TypeScript module augmentation for @mui/material/styles
type Icon = {
    sun?: string;
    moon?: string;
    star: string;
    cancel: string;
};
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
        icon: Icon;
        primaryGradient: string;
    }
    interface PaletteOptions {
        icon: Icon;
        primaryGradient: string;
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
    [theme.breakpoints.down("m")]: {
        fontSize: "0.9rem",
    },
    [theme.breakpoints.down("s")]: {
        fontSize: "0.85rem",
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem",
    },
    [theme.breakpoints.up("m")]: {
        fontSize: "0.95rem",
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
        primaryGradient: "linear-gradient(to right,#3EADCF,#ABE9CD)",
        primary: {
            main: "#3EADCF",
        },
        secondary: {
            main: "#ABE9CD",
        },
        warning: {
            main: red[700],
        },
        icon: {
            moon: grey[400],
            star: yellow[600],
            cancel: red[400],
        },
    },
    breakpoints: breakpoints,
    typography: {
        button: {
            textTransform: "none",
        },
    },
};
const darkTheme: ThemeOptions = {
    palette: {
        mode: "dark",
        primaryGradient: "linear-gradient(to right,#3EADCF,#ABE9CD)",
        primary: {
            main: "#3EADCF",
        },
        secondary: {
            main: "#ABE9CD",
        },
        warning: {
            main: red[200],
        },
        icon: {
            sun: amber[200],
            star: yellow[300],
            cancel: red[200],
        },
    },

    breakpoints: breakpoints,
    typography: {
        button: {
            textTransform: "none",
        },
    },
};

interface ColorContextSchema {
    toggleColorMode: () => void;
}
export const ColorContext = createContext<ColorContextSchema>({} as ColorContextSchema);

const App: React.FC = () => {
    const [mode, setMode] = useState<PaletteMode>("light");
    const theme = useMemo(() => createTheme(mode === "light" ? lightTheme : darkTheme), [mode]);
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        [],
    );
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.posts);

    const [viewPost, setViewPost] = useState<IPost>(initialPostState);
    const [writePost, setWritePost] = useState<IPost>(initialPostState);

    const matchViewPost = useMatch("/posts/:id/*");
    const matchWritePost = useMatch("/writepost/:id");

    useEffect(() => {
        dispatch(acSetPosts());
    }, []);
    useEffect(() => {
        setViewPost(
            matchViewPost
                ? posts.reduce(
                      (acc, post) => (post.id.toString() === matchViewPost.params.id ? post : acc),
                      initialPostState,
                  )
                : initialPostState,
        );
    }, [posts, matchViewPost]);
    useEffect(() => {
        setWritePost(
            matchWritePost
                ? posts.reduce(
                      (acc, post) => (post.id.toString() === matchWritePost.params.id ? post : acc),
                      initialPostState,
                  )
                : initialPostState,
        );
    }, [posts, matchWritePost]);

    return (
        <div className="App">
            <ColorContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <MediaQuery>
                        <CssBaseline enableColorScheme />
                        <ToastContainer />
                        <Routes>
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<SignUp />} />
                            <Route
                                path="posts/:id"
                                element={
                                    <RequireAuth>
                                        <ViewPost post={viewPost} />
                                    </RequireAuth>
                                }
                            >
                                <Route path="comments" element={<CommentsList />}></Route>
                            </Route>
                            <Route
                                path="posts"
                                element={
                                    <RequireAuth>
                                        <PostsList posts={posts} />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="writepost/:id"
                                element={
                                    <RequireAuth>
                                        <WritePost post={writePost} />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                path="writepost"
                                element={
                                    <RequireAuth>
                                        <WritePost post={writePost} />
                                    </RequireAuth>
                                }
                            />
                            <Route
                                index
                                element={
                                    <RequireAuth>
                                        <PostsList posts={posts} />
                                    </RequireAuth>
                                }
                            />
                        </Routes>
                    </MediaQuery>
                </ThemeProvider>
            </ColorContext.Provider>
        </div>
    );
};

export default App;
