let token: string;

const setToken = (_token: string): void => {
    console.log(_token);
    token = _token;
};

const getToken = (): {
    headers: {
        Authorization: string;
    };
} => {
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
};

const tokenService = { setToken, getToken };
export default tokenService;
