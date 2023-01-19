import { toastLogoutSuccess, toastLogoutError, toastFormat } from "utils/constants";
import { useAppDispatch } from "store";
import { acUserLogout } from "store/user/action";
import React from "react";
import { trackPromise } from "react-promise-tracker";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/LogoutRounded";

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        trackPromise(
            dispatch(acUserLogout())
                .then(() => {
                    toast.success(toastLogoutSuccess, toastFormat);
                    navigate("/");
                })
                .catch(() => {
                    toast.error(toastLogoutError, toastFormat);
                }),
        );
    };
    return (
        <Box
            sx={{
                position: "fixed",
                top: "1rem",
                left: "2rem",
                fontSize: "1rem",
            }}
        >
            <Button variant="contained" size="small" onClick={handleLogout} endIcon={<LogoutIcon />}>
                Logout
            </Button>
        </Box>
    );
};
export default LogoutButton;
