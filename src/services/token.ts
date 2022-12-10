let token: string;

export const setToken = (_token: string): void => {
    console.log(_token);
    token = _token;
};

export const getToken = (): {
    headers: {
        Authorization: string;
    };
} => {
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
};
