import { ICredentials, IStar, IUser, initialUserState } from "./types";
import { setUser } from "./reducer";
import authService from "../../services/auth";
import { AppThunk } from "..";
import starService from "services/stars";
import type { PayloadAction } from "@reduxjs/toolkit";

export const acSetUser = (user: IUser): AppThunk<Promise<PayloadAction<IUser>>> => {
    return async (dispatch) => {
        return dispatch(setUser(user));
    };
};
export const acUserStarPost = (user: IUser, star: IStar): AppThunk<Promise<PayloadAction<IUser>>> => {
    return async (dispatch) => {
        const newStar: IStar = await starService.create(star);
        user = {
            ...user,
            stars: [...user.stars, newStar],
        };
        return dispatch(setUser(user));
    };
};
export const acUserUnStarPost = (user: IUser, star_id: number): AppThunk<Promise<PayloadAction<IUser>>> => {
    return async (dispatch) => {
        await starService.remove(star_id);
        user = {
            ...user,
            stars: user.stars.filter((star) => star.id !== star_id),
        };
        return dispatch(setUser(user));
    };
};
export const acUserLogin = (credentials: ICredentials): AppThunk<Promise<PayloadAction<IUser>>> => {
    return async (dispatch) => {
        const user: IUser = await authService.login(credentials);
        return dispatch(setUser(user));
    };
};
export const acUserLogout = (): AppThunk<Promise<PayloadAction<IUser>>> => {
    return async (dispatch) => {
        await authService.logout();
        return dispatch(setUser(initialUserState));
    };
};
export const acUserSignUp = (credentials: ICredentials): AppThunk<Promise<PayloadAction<IUser>>> => {
    return async (dispatch) => {
        const user: IUser = await authService.signup(credentials);
        return dispatch(setUser(user));
    };
};
