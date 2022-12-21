import React from "react";
import { Box, Typography } from "@mui/material";

type WarningProps = {
    message: string;
};

const Warning = (props: WarningProps) => {
    return (
        <Box sx={{ height: "1.5rem" }}>
            <Typography component="p" variant="caption" align="left" sx={{ pl: 1.5 }} color="warning.main">
                {props.message}
            </Typography>
        </Box>
    );
};

export default Warning;
