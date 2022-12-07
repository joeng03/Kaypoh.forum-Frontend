import tokenService from "./token";
import { SIGN_UP, LOG_IN, LOG_OUT, GOOGLE_SIGN_UP, GOOGLE_USER_INFO } from "../utils/endpoints";
import { ICredentials, IUser } from "../store/user/types";
import axios from "axios";

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

const authService = { signup, login, logout };
export default authService;
