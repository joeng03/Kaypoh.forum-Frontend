import { ColorContext } from "../App";
import { Box, IconButton, useTheme } from "@mui/material";
import DarkIcon from "@mui/icons-material/DarkModeRounded";
import LightIcon from "@mui/icons-material/LightModeRounded";
import { amber, grey } from "@mui/material/colors";
import React, { useContext } from "react";

const SwitchModeButton = (): JSX.Element => {
    const theme = useTheme();
    const colorMode = useContext(ColorContext);
    return (
        <Box
            sx={{
                position: "absolute",
                top: "1rem",
                right: "2rem",
                fontSize: "1rem",
            }}
        >
            {theme.palette.mode === "light" ? "Light" : "Dark"} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <LightIcon sx={{ fontSize: "2rem", color: amber[200] }} />
                ) : (
                    <DarkIcon sx={{ fontSize: "2rem", color: grey[400] }} />
                )}
            </IconButton>
        </Box>
    );
};

export default SwitchModeButton;
