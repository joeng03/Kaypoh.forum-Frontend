import "./App.css";
import { useAppDispatch, useAppSelector } from "./store";
import { IPost, initialPostState } from "./store/posts/types";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import PostsList from "./components/Posts/PostsList";
import ViewPost from "./components/Posts/ViewPost";
import NotFound from "./components/NotFound";
import { lightTheme, darkTheme, ColorContext } from "utils/theme";
import { acSetPosts } from "store/posts/action";
import CommentsList from "components/Comments/CommentsList";
import Profile from "components/Profile";
import RequireAuth from "components/Authentication/RequireAuth";
import WritePost from "components/Posts/WritePost";

import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import type { PaletteMode } from "@mui/material";

const App = () => {
    const [mode, setMode] = useState<PaletteMode>(
        localStorage.getItem("mode") ? (localStorage.getItem("mode") as PaletteMode) : "dark",
    );
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
        localStorage.setItem("mode", mode);
    }, [mode]);
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
                    <CssBaseline enableColorScheme />

                    <ToastContainer />
                    <Routes>
                        <Route
                            path="login"
                            element={
                                <ThemeProvider theme={createTheme(lightTheme)}>
                                    <Login />{" "}
                                </ThemeProvider>
                            }
                        />
                        <Route
                            path="signup"
                            element={
                                <ThemeProvider theme={createTheme(lightTheme)}>
                                    <SignUp />{" "}
                                </ThemeProvider>
                            }
                        />
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
                            path="profile"
                            element={
                                <RequireAuth>
                                    <Profile />
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
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ThemeProvider>
            </ColorContext.Provider>
        </div>
    );
};

export default App;
