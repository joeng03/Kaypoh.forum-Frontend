import React from "react";
import Typewriter from "typewriter-effect";
import Typography from "@mui/material/Typography";
const AppTypewriter = () => {
    return (
        <Typography
            component="h1"
            variant="h5"
            sx={{
                fontWeight: "bold",
                fontFamily: "'Open Sans'",
                mb: "1rem",
            }}
        >
            <Typewriter
                options={{
                    delay: 55,
                }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Welcome to ")
                        .deleteAll(35)
                        .pauseFor(220)
                        .typeString("Kaypoh.forum")
                        .pasteString("🎉", null)
                        .start();
                }}
            />
        </Typography>
    );
};

export default AppTypewriter;
