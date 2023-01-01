import { useAppDispatch } from "store";
import { acSetPosts } from "store/posts/action";
import { acUserLogout } from "store/user/action";
import SwitchModeButton from "components/SwitchModeButton";
import { toastLogoutSuccess, toastLogoutError, toastFormat } from "utils/constants";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import useTheme from "@mui/material/styles/useTheme";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Pagination from "@mui/material/Pagination/Pagination";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const InputBaseWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "block",
    width: "30vw",
    maxWidth: theme.breakpoints.values.xs,
    borderRadius: "1rem",
    background: theme.palette.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.3)",
    "&:hover": {
        background: theme.palette.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.15)",
    },
    "&:focus-within": {
        background: "transparent",
    },
}));

const StyledInputBase = styled(InputBase)(() => ({
    position: "absolute",
    left: "1rem",
    width: "100%",
    "& input::placeholder": {
        fontSize: "0.9rem",
    },
}));
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const PostsNavigation = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [columnName, setColumnName] = useState<string>(
        localStorage.getItem("columnName") ? (localStorage.getItem("columnName") as string) : "title",
    );
    const [sortBy, setSortBy] = useState<string>(
        localStorage.getItem("sortBy") ? (localStorage.getItem("sortBy") as string) : "created_at DESC",
    );
    const [page, setPage] = useState<number>(1);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(acSetPosts(page, columnName, searchValue, sortBy));
        localStorage.setItem("columnName", columnName);
        localStorage.setItem("sortBy", sortBy);
    }, [page, columnName, sortBy]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(acSetPosts(page, columnName, searchValue, sortBy));
    };

    const handleLogout = () => {
        dispatch(acUserLogout())
            .then(() => {
                toast.success(toastLogoutSuccess, toastFormat);
                navigate("/login");
            })
            .catch(() => {
                toast.error(toastLogoutError, toastFormat);
            });
    };

    return (
        <>
            <AppBar
                position="fixed"
                color="transparent"
                sx={{
                    background: theme.palette.mode === "light" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(15px)",
                    overflow: "scroll",
                    fontSize: "0.9rem",
                }}
            >
                <Toolbar>
                    {drawerOpen ? (
                        <IconButton size="large" edge="start" color="inherit" onClick={() => setDrawerOpen(false)}>
                            <ChevronLeftIcon />
                        </IconButton>
                    ) : (
                        <IconButton size="large" edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", margin: "0 auto" }}>
                        <InputBaseWrapper>
                            <StyledInputBase
                                value={searchValue}
                                onChange={({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                    setSearchValue(target.value)
                                }
                                placeholder="Search…"
                            />
                        </InputBaseWrapper>
                        <Button type="submit" startIcon={<SearchIcon />} />
                        <InputLabel
                            sx={{
                                display: { xxs: "none", m: "flex" },
                                alignItems: "center",
                                mr: "0.5rem",
                                fontSize: "inherit",
                            }}
                        >
                            Search by
                        </InputLabel>
                        <Select
                            size="small"
                            variant="standard"
                            label="Column name"
                            value={columnName}
                            onChange={({ target }) => setColumnName(target.value)}
                            sx={{ mr: "0.5rem" }}
                        >
                            <MenuItem value="title">Title</MenuItem>
                            <MenuItem value="content">Content</MenuItem>
                            <MenuItem value="tag">Tag</MenuItem>
                        </Select>
                        <InputLabel
                            sx={{
                                display: { xxs: "none", m: "flex" },
                                alignItems: "center",
                                mr: "0.5rem",
                                fontSize: "inherit",
                            }}
                        >
                            Sort by
                        </InputLabel>
                        <Select
                            size="small"
                            variant="standard"
                            label="Sort by"
                            value={sortBy}
                            onChange={({ target }) => setSortBy(target.value)}
                        >
                            <MenuItem value="created_at DESC">Date created</MenuItem>
                            <MenuItem value="updated_at DESC">Date Updated</MenuItem>
                            <MenuItem value="stars">Stars</MenuItem>
                            <MenuItem value="tag">Tag</MenuItem>
                        </Select>
                    </Box>
                    <SwitchModeButton />
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    width: "100vw",
                    position: "fixed",
                    bottom: 0,
                    padding: "0.5rem 0rem",
                    background: "background",
                    zIndex: 1600,
                }}
            >
                <Pagination
                    count={100}
                    variant="outlined"
                    color="primary"
                    page={page}
                    onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                        setPage(value);
                    }}
                    sx={{ display: "inline-block" }}
                />
            </Box>
            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                transitionDuration={{ enter: 400, exit: 300 }}
            >
                <Box sx={{ width: "12rem", mt: "3rem" }} role="presentation">
                    <List>
                        <Link to="/writepost" style={{ color: "inherit", textDecoration: "inherit" }}>
                            <ListItem key="Create post" disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Create post" />
                                    <ListItemIcon>{<AddBoxTwoToneIcon />}</ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/profile" style={{ color: "inherit", textDecoration: "inherit" }}>
                            <ListItem key="My Profile" disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="My Profile" />
                                    <ListItemIcon>{<AccountCircleTwoToneIcon />}</ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <ListItem key="Logout" disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                                <ListItemIcon>{<ExitToAppTwoToneIcon />}</ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default PostsNavigation;
