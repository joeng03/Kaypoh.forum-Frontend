import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

type LoadingProps = {
    type: "linear" | "circular";
};
const Loading = ({ type }: LoadingProps) => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        <>
            {promiseInProgress &&
                (type === "linear" ? (
                    <Box
                        sx={{
                            width: "100%",
                            zIndex: 2000,
                        }}
                    >
                        <LinearProgress color="secondary" />{" "}
                    </Box>
                ) : (
                    <CircularProgress
                        size={50}
                        sx={{
                            position: "absolute",
                            zIndex: 2000,
                            width: "50%",
                            height: "50%",
                            opacity: "50%",
                        }}
                        color="inherit"
                    />
                ))}
        </>
    );
};

export default Loading;
