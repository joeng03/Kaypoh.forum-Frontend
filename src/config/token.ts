import axios from "axios";
/* 
    setToken is a helper function which:
        1. Stores the JWT token in local storage
        2. Places the JWT token in the axios default headers
*/
export const setToken = (token: string) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = token;
};

/* 
    removeToken is a helper function which:
        1. Removes the JWT token in local storage
        2. Removes the JWT token in the axios default headers
*/
export const removeToken = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
};
