import { verifyCookie } from "../../services/auth";
import { acSetUser } from "../../store/user/action";
import { useAppDispatch } from "store";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        verifyCookie()
            .then((user) => {
                dispatch(acSetUser(user));
            })
            .catch(() => {
                navigate("/login");
            });
    }, []);

    return <>{children}</>;
};

export default RequireAuth;
