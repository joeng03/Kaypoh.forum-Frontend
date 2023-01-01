import { createContext } from "react";
import amber from "@mui/material/colors/amber";
import grey from "@mui/material/colors/grey";
import red from "@mui/material/colors/red";
import yellow from "@mui/material/colors/yellow";
import type { ThemeOptions } from "@mui/material/styles/createTheme";

// TypeScript module augmentation for @mui/material/styles

export type Icon = {
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

export const lightTheme: ThemeOptions = {
    palette: {
        mode: "light",
        primaryGradient: "linear-gradient(to right,#3EADCF,#ABE9CD)",
        primary: {
            main: "#00b0e9",
            light: "#8bdef7",
            dark: "#00a2db",
        },
        secondary: {
            main: "#f6afc8",
            light: "#abe9cd",
            dark: "#00ae66",
        },
        warning: {
            main: red[300],
        },
        icon: {
            moon: grey[400],
            star: yellow[600],
            cancel: red[600],
        },
    },
    breakpoints: breakpoints,
    typography: {
        button: {
            textTransform: "none",
        },
    },
};
export const darkTheme: ThemeOptions = {
    palette: {
        mode: "dark",
        primaryGradient: "linear-gradient(to right,#3EADCF,#ABE9CD)",
        primary: {
            // main: "#4bc7ea",
            main: "#7fd7ef",
            light: "#8bdef7",
            dark: "#00a2db",
        },
        secondary: {
            // main: "#76d9af",
            main: "#FFDEE9",
            light: "#abe9cd",
            dark: "#00ae66",
        },
        warning: {
            main: red[200],
        },
        icon: {
            sun: amber[200],
            star: yellow[300],
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

interface ColorContextSchema {
    toggleColorMode: () => void;
}
export const ColorContext = createContext<ColorContextSchema>({} as ColorContextSchema);
