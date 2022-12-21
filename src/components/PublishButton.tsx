import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const PublishButton = () => {
    return (
        <Button
            type="submit"
            variant="contained"
            size="small"
            endIcon={<SendIcon />}
            sx={{ m: "0 auto", position: "absolute", right: "0.2rem" }}
        >
            Publish
        </Button>
    );
};

export default PublishButton;
