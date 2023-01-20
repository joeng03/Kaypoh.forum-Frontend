import "./App.css";
import { useAppSelector } from "./store";
import SignUp from "./pages/User/SignUp";
import Login from "./pages/User/Login";
import PostsList from "./pages/Posts/PostsList";
import ViewPost from "./pages/Posts/ViewPost";
import WriteTopic from "./pages/Topics/WriteTopic";
import CodeOfConduct from "./pages/General/CodeOfConduct";
import NotFound from "./pages/General/NotFound";
import ForumTopics from "pages/Topics/ForumTopics";
import ScrollToTop from "components/UI/General/ScrollToTop";
import { lightTheme, darkTheme, ColorContext } from "config/theme";
import CommentsList from "pages/Comments/CommentsList";
import Profile from "pages/User/Profile";
import RequireAuth from "components/UI/General/RequireAuth";
import WritePost from "pages/Posts/WritePost";
import Navigation from "components/UI/Navigation/Navigation";

import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
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
        <ScrollToTop>
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
        </ScrollToTop>
    );
};

export default App;
