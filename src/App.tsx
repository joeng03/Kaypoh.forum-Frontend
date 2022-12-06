import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { SwitchModeButton } from "./components/SwitchModeButton";
import "./App.css";
import store from "./store";
import { clientId } from "utils/constants";

import React, { useState, useMemo, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { blue, orange, red, indigo, deepPurple } from "@mui/material/colors";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ThemeOptions, PaletteMode } from "@mui/material";

const lightTheme: ThemeOptions = {
    palette: {
        mode: "light",
        primary: indigo,
        secondary: deepPurple,
        warning: {
            main: red[700],
        },
    },
};
const darkTheme: ThemeOptions = {
    palette: {
        mode: "dark",
        warning: {
            main: red[200],
        },
    },
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
                    <GoogleOAuthProvider clientId={clientId}>
                        <CssBaseline enableColorScheme />
                        <SwitchModeButton />
                        <BrowserRouter>
                            <Provider store={store}>
                                <Routes>
                                    <Route path="/signup" element={<SignUp />} />
                                    <Route path="/" element={<Login />} />
                                </Routes>
                            </Provider>
                        </BrowserRouter>
                    </GoogleOAuthProvider>
                </ThemeProvider>
            </ColorContext.Provider>
        </div>
    );
};

export default App;
