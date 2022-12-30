import type { ToastOptions } from "react-toastify";

export const toastSignUpSuccess = "Successfully signed up!";
export const toastLoginSuccess = "Successfully logged in!";
export const toastLogoutSuccess = "Successfully logged out!";
export const toastUpdateProfileSuccess = "Successfully updated profile!";
export const toastPublishPostSuccess = "Succesfully published post!";
export const toastDeletePostSuccess = "Successfully deleted post!";
export const toastPublishCommentSuccess = "Succesfully published comment!";
export const toastDeleteCommentSuccess = "Successfully deleted comment!";
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

export const toastLoginError = "Incorrect email and/or password";
export const toastLogoutError = "Unable to logout";
export const toastUpdateProfileError = "Failed to update profile";
export const toastNotAuthorizedWarning =
    "You are not authorized to perform this action. If your session has expired, please sign in again";

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
export const stringMaxLength = 255;
export const textMaxLength = 3e4;
