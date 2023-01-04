import { ColorContext } from "utils/theme";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import DarkIcon from "@mui/icons-material/DarkModeRounded";
import LightIcon from "@mui/icons-material/LightModeRounded";
import React, { useContext } from "react";

const SwitchModeButton = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorContext);
    return (
        <Box
            sx={{
                display: "block",
                fontSize: "1rem",
            }}
        >
            <Typography sx={{ display: { xxs: "none", m: "inline-block" }, fontSize: "0.95rem" }}>
                {" "}
                {theme.palette.mode === "light" ? "Light" : "Dark"} mode
            </Typography>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <LightIcon sx={{ fontSize: "2rem", color: "icon.sun" }} />
                ) : (
                    <DarkIcon sx={{ fontSize: "2rem", color: "icon.moon" }} />
                )}
            </IconButton>
        </Box>
    );
};

export default SwitchModeButton;
