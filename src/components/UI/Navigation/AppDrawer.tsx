import { useAppDispatch, useAppSelector } from "store";
import { acUserLogout } from "store/user/action";
import { toastLogoutSuccess, toastLogoutError, toastFormat } from "config/constants";
import React from "react";
import { toast } from "react-toastify";
import { trackPromise } from "react-promise-tracker";
import { Link, useNavigate } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

type AppDrawerItemProps = {
    onClick: () => void;
    text: string;
};

const AppDrawerItem: React.FC<AppDrawerItemProps> = ({ onClick, text, children }) => {
    return (
        <ListItem key={text} onClick={onClick} disablePadding>
            <ListItemButton sx={{ "&:hover": { color: "primary.main" } }}>
                <ListItemText primary={text} primaryTypographyProps={{ fontSize: "0.9rem" }} />
                {children}
            </ListItemButton>
        </ListItem>
    );
};

type AppDrawerProps = {
    drawerOpen: boolean;
    closeDrawer: () => void;
};

const AppDrawer = ({ drawerOpen, closeDrawer }: AppDrawerProps) => {
    const user = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        closeDrawer();
        trackPromise(
            dispatch(acUserLogout())
                .then(() => {
                    toast.success(toastLogoutSuccess, toastFormat);
                    navigate("/login");
                })
                .catch(() => {
                    toast.error(toastLogoutError, toastFormat);
                }),
        );
    };
    return (
        <Drawer open={drawerOpen} onClose={closeDrawer} transitionDuration={{ enter: 300, exit: 200 }}>
            <Box sx={{ width: "9rem", mt: "3rem" }} role="presentation">
                <List>
                    {user.admin_level > 0 && (
                        <Link to="/writetopic" style={{ color: "inherit", textDecoration: "inherit" }}>
                            <AppDrawerItem onClick={closeDrawer} text={"Write topic"}>
                                <span>✍🏻</span>
                                {/* <BorderColorRoundedIcon sx={{ fontSize: "0.9rem" }} /> */}
                            </AppDrawerItem>
                        </Link>
                    )}
                    <Link to="/forumtopics" style={{ color: "inherit", textDecoration: "inherit" }}>
                        <AppDrawerItem onClick={closeDrawer} text={"Forum topics"}>
                            <span>💬</span>

                            {/* <BorderColorRoundedIcon sx={{ fontSize: "0.9rem" }} /> */}
                        </AppDrawerItem>
                    </Link>
                    <Link to="/writepost" style={{ color: "inherit", textDecoration: "inherit" }}>
                        <AppDrawerItem onClick={closeDrawer} text={"Write post"}>
                            <span>✉️</span>

                            {/* <BorderColorRoundedIcon sx={{ fontSize: "0.9rem" }} /> */}
                        </AppDrawerItem>
                    </Link>
                    <Link to="/profile" style={{ color: "inherit", textDecoration: "inherit" }}>
                        <AppDrawerItem onClick={closeDrawer} text={"My profile"}>
                            <span>😎</span>

                            {/* <AccountCircleRoundedIcon sx={{ fontSize: "0.9rem" }} /> */}
                        </AppDrawerItem>
                    </Link>
                    <AppDrawerItem onClick={handleLogout} text={"Logout "}>
                        <span>⬅️</span>

                        {/* <LogoutRoundedIcon sx={{ fontSize: "0.9rem" }} /> */}
                    </AppDrawerItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default AppDrawer;
