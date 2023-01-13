import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        <>
            {promiseInProgress && (
                <Box
                    sx={{
                        width: "100%",
                        zIndex: 2000,
                    }}
                >
                    <LinearProgress color="secondary" />
                </Box>
            )}
        </>
    );
};

export default Loading;
