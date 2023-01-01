import Loading from "../Loading";
import { verifyCookie } from "../../services/auth";
import { acSetUser } from "../../store/user/action";
import { useAppDispatch } from "store";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        verifyCookie()
            .then((user) => {
                dispatch(acSetUser(user));
                setIsLoading(false);
            })
            .catch(() => {
                navigate("/login");
            });
    }, []);

    //if user is not logged in, the default id is -1 (Reference: "../../store/user/reducer.ts")
    return isLoading ? <Loading /> : <>{children}</>;
};

export default RequireAuth;
