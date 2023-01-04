import { SIGN_UP, LOG_IN, LOG_OUT } from "../utils/endpoints";
import { ICredentials, IUser } from "../store/user/types";
import axios from "axios";

export const verifyCookie = async (): Promise<IUser> => {
    const response = await axios.get(LOG_IN);
    return response.data;
};

const update = async (user: FormData): Promise<IUser> => {
    const response = await axios.put(SIGN_UP, user);
    return response.data;
};

const login = async (credentials: ICredentials): Promise<IUser> => {
    const response = await axios.post(LOG_IN, { user: credentials });
    return response.data;
};

const signup = async (credentials: ICredentials): Promise<IUser> => {
    const response = await axios.post(SIGN_UP, { user: credentials });
    return response.data;
};

const logout = async () => {
    const response = await axios.delete(LOG_OUT);
    return response.data;
};

const authService = { verifyCookie, update, login, signup, logout };
export default authService;
