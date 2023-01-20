import { emailRegex, passwordMinLength, usernameMaxLength, stringMaxLength } from "./constants";

export const validateUsername = (username: string): string => {
    if (!username) {
        return "Username is required";
    }
    if (username.indexOf(" ") >= 0) {
        return "Username must not contain whitespace";
    }
    if (username.length > usernameMaxLength) {
        return `Username must have at most ${usernameMaxLength} characters`;
    }
    return "";
};
export const validateEmail = (email: string): string => {
    if (!email) {
        return "Email is required";
    }
    if (!emailRegex.test(email)) {
        return "Incorrect email format";
    }
    if (email.length > stringMaxLength) {
        return `Email must have at most ${stringMaxLength} characters`;
    }
    return "";
};

export const validatePassword = (password: string): string => {
    if (!password) {
        return "Password is required";
    }
    if (password.length < passwordMinLength) {
        return `Password must have at least ${passwordMinLength} characters`;
    }
    if (password.length > stringMaxLength) {
        return `Password must have at most ${stringMaxLength} characters`;
    }
    return "";
};
