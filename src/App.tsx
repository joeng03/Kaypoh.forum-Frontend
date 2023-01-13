import "./App.css";
import { useAppSelector } from "./store";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import PostsList from "./components/Posts/PostsList";
import ViewPost from "./components/Posts/ViewPost";
import WriteTopic from "./components/Topics/WriteTopic";
import CodeOfConduct from "./components/CodeOfConduct";
import NotFound from "./components/NotFound";
import Loading from "components/Loading";
import ForumTopics from "components/Topics/ForumTopics";
import { lightTheme, darkTheme, ColorContext } from "utils/theme";
import CommentsList from "components/Comments/CommentsList";
import Profile from "components/Profile";
import RequireAuth from "components/Authentication/RequireAuth";
import WritePost from "components/Posts/WritePost";
import Navigation from "components/Navigation";

import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);

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
                                    <>
                                        <Navigation />
                                        <ViewPost />
                                    </>
                                </RequireAuth>
                            }
                        >
                            <Route path="comments" element={<CommentsList />}></Route>
                        </Route>
                        <Route
                            path="posts"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <PostsList />
                                    </>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="writepost/:id"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <WritePost />
                                    </>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="writepost"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <WritePost />
                                    </>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="writetopic/:id"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <WriteTopic />
                                    </>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="writetopic"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <WriteTopic />
                                    </>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="forumtopics"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <ForumTopics />
                                    </>
                                </RequireAuth>
                            }
                        />

                        <Route
                            path="profile"
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <Profile />
                                    </>
                                </RequireAuth>
                            }
                        />
                        <Route path="codeofconduct" element={<CodeOfConduct />}></Route>
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <>
                                        <Navigation />
                                        <PostsList />
                                    </>
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
