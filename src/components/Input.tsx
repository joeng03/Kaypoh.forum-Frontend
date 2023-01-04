import Warning from "./Authentication/Warning";
import { stringMaxLength } from "utils/constants";
import React from "react";
import styled from "@mui/material/styles/styled";
import InputBase from "@mui/material/InputBase";

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: "0.4rem 0.75rem 0.1rem ",
    borderRadius: "0.75rem",
    transition: "0.4s",
    background: theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.2)",
    "&:hover": {
        background: theme.palette.mode === "light" ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.1)",
    },
}));

type InputProps = {
    placeholder: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    validate: (input: string) => string;
    message: string;
    autoComplete?: string;
    autoFocus?: boolean;
    type?: string;
    required?: boolean;
    multiline?: boolean;
    rows?: number;
    maxLength?: number;
};

const Input = ({
    placeholder,
    value,
    setValue,
    setMessage,
    validate,
    message,
    autoComplete = "off",
    autoFocus = false,
    type = "text",
    required = true,
    multiline = false,
    rows = 1,
    maxLength = stringMaxLength,
}: InputProps) => {
    return (
        <>
            <StyledInput
                size="small"
                placeholder={placeholder}
                value={value}
                onChange={({ target }) => setValue(target.value)}
                onFocus={() => setMessage("")}
                onBlur={({ target }) => setMessage(validate(target.value))}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                type={type}
                required={required}
                multiline={multiline}
                rows={rows}
                inputProps={{ maxLength }}
                fullWidth
            />
            <Warning message={message} />
        </>
    );
};

export default Input;
