import { ColorContext } from "config/theme";
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
            }}
        >
            <Typography sx={{ display: { xxs: "none", m: "inline-block" }, fontSize: "0.9rem" }}>
                {" "}
                {theme.palette.mode === "light" ? "Light" : "Dark"} mode
            </Typography>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <LightIcon sx={{ color: "icon.sun", fontSize: "1.7rem" }} />
                ) : (
                    <DarkIcon sx={{ color: "icon.moon", fontSize: "1.7rem" }} />
                )}
            </IconButton>
        </Box>
    );
};

export default SwitchModeButton;
