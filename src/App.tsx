import "./App.css";
import { useAppSelector } from "./store";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import PostsList from "./components/Posts/PostsList";
import ViewPost from "./components/Posts/ViewPost";
import WriteTopic from "./components/Topics/WriteTopic";
import CodeOfConduct from "./components/CodeOfConduct";
import NotFound from "./components/NotFound";
import { lightTheme, darkTheme, ColorContext } from "utils/theme";
import CommentsList from "components/Comments/CommentsList";
import Profile from "components/Profile";
import RequireAuth from "components/Authentication/RequireAuth";
import WritePost from "components/Posts/WritePost";
import Navigation from "components/Navigation";

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
    const user = useAppSelector((state) => state.user);
    const posts = useAppSelector((state) => state.posts);

    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);

    return (
        <div className="App">
            <ColorContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme />
                    <Navigation />
                    <ToastContainer />
                    <Routes>
                        <Route
                            path="login"
                            element={
                                <ThemeProvider theme={createTheme(lightTheme)}>
                                    <Login />
                                </ThemeProvider>
                            }
                        />
                        <Route
                            path="signup"
                            element={
                                <ThemeProvider theme={createTheme(lightTheme)}>
                                    <SignUp />
                                </ThemeProvider>
                            }
                        />
                        <Route
                            path="posts/:id"
                            element={
                                <RequireAuth>
                                    <ViewPost />
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
                                    <WritePost />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="writepost"
                            element={
                                <RequireAuth>
                                    <WritePost />
                                </RequireAuth>
                            }
                        />
                        {user.admin_level > 0 && (
                            <>
                                <Route
                                    path="writetopic/:id"
                                    element={
                                        <RequireAuth>
                                            <WriteTopic />
                                        </RequireAuth>
                                    }
                                />
                                <Route
                                    path="writetopic"
                                    element={
                                        <RequireAuth>
                                            <WriteTopic />
                                        </RequireAuth>
                                    }
                                />
                            </>
                        )}

                        <Route
                            path="profile"
                            element={
                                <RequireAuth>
                                    <Profile />
                                </RequireAuth>
                            }
                        />
                        <Route path="codeofconduct" element={<CodeOfConduct />}></Route>
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
