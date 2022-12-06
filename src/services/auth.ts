import tokenService from "./token";
import { SIGN_UP, LOG_IN, LOG_OUT, GOOGLE_SIGN_UP, GOOGLE_USER_INFO } from "../utils/endpoints";
import { ICredentials, IUser } from "../store/user/types";
import axios, { AxiosError } from "axios";
import type { TokenResponse } from "@react-oauth/google";

const signup = async (credentials: ICredentials): Promise<IUser> => {
    const response = await axios.post(SIGN_UP, { user: credentials });
    return response.data;
};
const login = async (credentials: ICredentials): Promise<IUser> => {
    const response = await axios.post(LOG_IN, { user: credentials });
    return response.data;
};

const logout = async () => {
    const response = await axios.delete(LOG_OUT, tokenService.getToken());
    return response.data;
};
const google_user_info = async (access_token: string) => {
    const response = await axios.get(GOOGLE_USER_INFO + access_token);
    return response.data;
};

const google_signin = async (tokenResponse: TokenResponse) => {
    const response = await axios.post(GOOGLE_SIGN_UP, tokenResponse);
    return response.data;
};

const authService = { signup, login, logout, google_user_info, google_signin };
export default authService;
