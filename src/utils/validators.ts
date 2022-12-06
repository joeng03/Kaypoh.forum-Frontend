import { emailRegex } from "./constants";

export const validateUsername = (username: string): string => {
    if (!username) {
        return "Username is required";
    }
    return "";
};
export const validateEmail = (email: string): string => {
    if (!email) {
        return "Email is required";
    } else if (!emailRegex.test(email)) {
        return "Incorrect email format";
    }
    return "";
};

export const validatePassword = (password: string): string => {
    if (!password) {
        return "Password is required";
    } else if (password.length < 6) {
        return "Password must have at least 6 characters";
    }
    return "";
};
