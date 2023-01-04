import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NotFound = () => {
    return (
        <Container
            className="gradient-background"
            sx={{
                display: "flex",
            }}
        >
            <Box className="noselect form" maxWidth="s" sx={{ position: "relative" }}>
                <Typography variant="h1" fontWeight="bold">
                    404
                </Typography>
                <Typography variant="h5">The requested page was not found.</Typography>
            </Box>
        </Container>
    );
};

export default NotFound;
