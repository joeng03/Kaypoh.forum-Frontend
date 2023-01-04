import React from "react";
import { Link } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

const StyledButton = styled(Button)(({ theme }) => ({
    ml: "0.5rem",
    borderRadius: "0.5rem",
    color: theme.palette.mode === "light" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)",
    "&:hover": {
        color: theme.palette.mode === "light" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
    },
    "&.MuiButtonBase-root:hover": {
        bgcolor: "transparent",
    },
}));

const HomeButton = () => {
    return (
        <Link to="/" style={{ textDecoration: "inherit" }}>
            <StyledButton endIcon={<HomeIcon />} disableRipple disableFocusRipple>
                Home
            </StyledButton>
        </Link>
    );
};
export default HomeButton;
