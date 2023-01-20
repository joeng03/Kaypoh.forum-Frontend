import { SIGN_UP, LOG_IN, LOG_OUT } from "../config/endpoints";
import { ICredentials, IUser } from "../store/user/types";
import { setToken, removeToken } from "config/token";
import axios from "axios";

export const verifyToken = async (): Promise<IUser> => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
    const response = await axios.get(LOG_IN);
    return response.data;
};

const update = async (user: FormData): Promise<IUser> => {
    const response = await axios.put(SIGN_UP, user);
    return response.data;
};

const login = async (credentials: ICredentials): Promise<IUser> => {
    const response = await axios.post(LOG_IN, { user: credentials });
    setToken(response.headers.authorization as string);

    return response.data;
};

const signup = async (credentials: ICredentials): Promise<IUser> => {
    const response = await axios.post(SIGN_UP, { user: credentials });
    setToken(response.headers.authorization as string);
    return response.data;
};

const logout = async () => {
    const response = await axios.delete(LOG_OUT);
    removeToken();
    return response.data;
};

const authService = { verifyToken, update, login, signup, logout };
export default authService;
