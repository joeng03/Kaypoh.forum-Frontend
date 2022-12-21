import Login from "./Login";
import Loading from "../Loading";
import { verifyCookie } from "../../services/auth";
import { acSetUser } from "../../store/user/action";
import { acSetPosts } from "../../store/posts/action";
import { useAppSelector, useAppDispatch } from "store";
import React, { useState, useEffect } from "react";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        verifyCookie()
            .then((user) => {
                dispatch(acSetUser(user));
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

    //if user is not logged in, the default id is -1 (Reference: "../../store/user/reducer.ts")
    return isLoading ? <Loading /> : user.id === -1 ? <Login /> : <>{children}</>;
};

export default RequireAuth;
