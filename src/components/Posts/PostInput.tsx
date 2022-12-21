import React from "react";
import TextField from "@mui/material/TextField";

type PostInputProps = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
};

const PostInput = (props: PostInputProps) => {
    return (
        <TextField
            variant="standard"
            value={props.value}
            onChange={({ target }) => props.setValue(target.value)}
            placeholder={props.placeholder}
            InputProps={{ disableUnderline: true }}
            fullWidth
        ></TextField>
    );
};

export default PostInput;