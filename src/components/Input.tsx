import Warning from "./Warning";
import React from "react";
import { Grid, TextField } from "@mui/material";

type InputProps = {
    id: string;
    label: string;
    name: string;
    autoComplete: string;
    value: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    validate: (input: string) => string;
    message: string;
    autoFocus?: boolean;
    type?: string;
};

const Input = (props: InputProps): JSX.Element => {
    return (
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                variant="filled"
                size="small"
                id={props.id}
                label={props.label}
                name={props.name}
                autoComplete={props.autoComplete}
                value={props.value}
                onChange={({ target }) => props.setInput(target.value)}
                onFocus={() => props.setMessage("")}
                onBlur={({ target }) => props.setMessage(props.validate(target.value))}
                autoFocus={"autoFocus" in props && props.autoFocus}
                type={"type" in props ? props.type : undefined}
            />
            <Warning message={props.message} />
        </Grid>
    );
};

export default Input;
