import type { ToastOptions } from "react-toastify";

// specific toast messages (constansts)
export const toastSignUpSuccess = "Successfully signed up!";
export const toastLoginSuccess = "Successfully logged in!";
export const toastLogoutSuccess = "Successfully logged out!";
export const toastUpdateProfileSuccess = "Successfully updated profile!";

export const toastLoginError = "Incorrect email and/or password";
export const toastLogoutError = "Unable to logout";
export const toastUpdateProfileError = "Failed to update profile";
export const toastNotAuthorizedWarning =
    "You are not authorized to perform this action. If your session has expired, please log in again";

// General toast messages (functions)
export const toastPublishSuccess = (item: string) => `Successfully published ${item} !`;

export const toastDeleteSuccess = (item: string) => `Successfully deleted ${item} !`;

export const toastSignUpError = (errors: { email?: string; username?: string }): string => {
    let message = "";
    if (errors && "email" in errors) {
        message += "Email";
    }
    if ("username" in errors) {
        message = message === "" ? "Username" : message + " and username";
    }
    return `${message} has already been taken`;
};
export const toastFormat: ToastOptions = {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
};

export const emailRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

export const passwordMinLength = 6;
export const usernameMaxLength = 10;
export const stringMaxLength = 255;
export const textMaxLength = 3e4;
