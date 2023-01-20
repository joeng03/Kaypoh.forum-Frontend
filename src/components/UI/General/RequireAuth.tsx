import { verifyToken } from "../../../services/auth";
import { acSetUser } from "../../../store/user/action";
import { removeToken } from "config/token";
import { useAppDispatch } from "store";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const [verified, setVerified] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        verifyToken()
            .then((user) => {
                setVerified(true);
                dispatch(acSetUser(user));
            })
            .catch(() => {
                removeToken();
                navigate("/login");
            });
    }, []);

    return <>{verified && children}</>;
};

export default RequireAuth;
