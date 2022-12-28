import { useAppDispatch } from "store";
import { acSetPosts } from "store/posts/action";
import { acUserLogout } from "store/user/action";
import SwitchModeButton from "components/SwitchModeButton";
import { toastLogoutSuccess, toastLogoutError, toastFormat } from "utils/constants";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
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
import type { Theme } from "@mui/material/styles";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: "30vw",
    maxWidth: theme.breakpoints.values.xs,
    color: "inherit",
}));
const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("s")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
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
    const [columnName, setColumnName] = useState<string>("title");
    const [sortBy, setSortBy] = useState<string>("created_at DESC");
    const [page, setPage] = useState<number>(1);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const isMount = useRef(true);

    // This useEffect hook only works after first render, as the initial posts are already fetched in <App/>
    useEffect(() => {
        if (isMount.current) {
            isMount.current = false;
        } else {
            dispatch(acSetPosts(page, columnName, searchValue, sortBy));
        }
    }, [page, columnName, sortBy]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(acSetPosts(page, columnName, searchValue, sortBy));
    };

    const handleLogout = () => {
        dispatch(acUserLogout())
            .then(() => {
                toast.success(toastLogoutSuccess, toastFormat);
                navigate("/");
            })
            .catch(() => {
                toast.error(toastLogoutError, toastFormat);
            });
    };

    return (
        <>
            <AppBar position="fixed" color="transparent" sx={{ backdropFilter: "blur(20px)", overflow: "scroll" }}>
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
                        <StyledInputBase
                            value={searchValue}
                            onChange={({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                setSearchValue(target.value)
                            }
                            placeholder="Search…"
                        />
                        <Button type="submit" endIcon={<SearchIcon />} sx={{ p: 0 }} />
                        <InputLabel sx={{ display: { xxs: "none", m: "flex" }, alignItems: "center", mr: "0.5rem" }}>
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
                        <InputLabel sx={{ display: { xxs: "none", m: "flex" }, alignItems: "center", mr: "0.5rem" }}>
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
                <Box
                    sx={{ width: "12rem", mt: "3rem" }}
                    role="presentation"
                    // onClick={toggleDrawer(anchor, false)}
                    // onKeyDown={toggleDrawer(anchor, false)}
                >
                    <List>
                        {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{<MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))} */}
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
