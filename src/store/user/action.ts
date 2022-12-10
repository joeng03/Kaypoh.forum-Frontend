import { ICredentials, IUser } from "./types";
import { setUser } from "./reducer";
import { setToken } from "../../services/token";
import authService from "../../services/auth";
import { AppThunk } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";

// export const acSetUser = (userProfile: IUser): AppThunk<Promise<PayloadAction<IUser>>> => {
//     return async (dispatch) => {
//         const user: IUser = await authService.google_signup(userProfile);
//         window.localStorage.setItem("user", JSON.stringify(user));
//         return dispatch(setUser(user));
//     };
// };

export const acUserLogin = (credentials: ICredentials): AppThunk<Promise<PayloadAction<IUser>>> => {
    return async (dispatch) => {
        const user: IUser = await authService.login(credentials);
        setToken(user.token);
        window.localStorage.setItem("user", JSON.stringify(user));
        return dispatch(setUser(user));
    };
};
export const acUserSignUp = (credentials: ICredentials): AppThunk<Promise<PayloadAction<IUser>>> => {
    return async (dispatch) => {
        const user: IUser = await authService.signup(credentials);
        setToken(user.token);
        window.localStorage.setItem("user", JSON.stringify(user));
        return dispatch(setUser(user));
    };
};
