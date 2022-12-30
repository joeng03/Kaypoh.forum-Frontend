import Warning from "./Authentication/Warning";
import React from "react";
import TextField from "@mui/material/TextField";

type InputProps = {
    id: string;
    label: string;
    name: string;
    autoComplete: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    validate: (input: string) => string;
    message: string;
    autoFocus?: boolean;
    type?: string;
};

const Input = (props: InputProps) => {
    return (
        <>
            <TextField
                variant="filled"
                size="small"
                id={props.id}
                label={props.label}
                name={props.name}
                autoComplete={props.autoComplete}
                value={props.value}
                onChange={({ target }) => props.setValue(target.value)}
                onFocus={() => props.setMessage("")}
                onBlur={({ target }) => props.setMessage(props.validate(target.value))}
                autoFocus={"autoFocus" in props && props.autoFocus}
                type={"type" in props ? props.type : undefined}
                required
                fullWidth
            />
            <Warning message={props.message} />
        </>
    );
};

export default Input;
