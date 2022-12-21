import { emailRegex, passwordMinLength, stringMaxLength } from "./constants";

export const validateUsername = (username: string): string => {
    if (!username) {
        return "Username is required";
    }
    if (username.indexOf(" ") >= 0) {
        return "Username must not contain any whitespaces";
    }
    if (username.length > stringMaxLength) {
        return `Username must have less than ${stringMaxLength} characters`;
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
        return `Email must have less than ${stringMaxLength} characters`;
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
        return `Password must have less than ${stringMaxLength} characters`;
    }
    return "";
};
