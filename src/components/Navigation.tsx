import { useAppDispatch } from "store";
import { acSetPosts } from "store/posts/action";
import SwitchModeButton from "components/SwitchModeButton";
import HomeButton from "components/HomeButton";
import AppDrawer from "components/AppDrawer";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import useTheme from "@mui/material/styles/useTheme";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination/Pagination";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const InputBaseWrapper = styled(Box)(({ theme }) => ({
    position: "relative",
    display: "block",
    width: "30vw",
    maxWidth: theme.breakpoints.values.xs,
    borderRadius: "1rem",
    transition: "0.4s",
    background: theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.3)",
    "&:hover": {
        background: theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.15)",
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
const drawerWidth = 100;

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

const Navigation = () => {
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
    const theme = useTheme();

    const closeDrawer = () => setDrawerOpen(false);
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(acSetPosts(page, columnName, searchValue, sortBy));
    };

    return useLocation().pathname !== "/login" && useLocation().pathname !== "/signup" ? (
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
                    <HomeButton />
                    {useLocation().pathname === "/" || useLocation().pathname === "/posts" ? (
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
                                sx={{ mr: "0.5rem", width: "5rem", fontSize: "0.95rem" }}
                            >
                                <MenuItem value="title" dense>
                                    Title
                                </MenuItem>
                                <MenuItem value="content" dense>
                                    Content
                                </MenuItem>
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
                                sx={{
                                    width: "5.5rem",
                                    fontSize: "0.95rem",
                                }}
                            >
                                <MenuItem value="created_at DESC" dense>
                                    Created
                                </MenuItem>
                                <MenuItem value="updated_at DESC" dense>
                                    Updated
                                </MenuItem>
                                <MenuItem value="comments" dense>
                                    Hot
                                </MenuItem>
                                <MenuItem value="stars" dense>
                                    Stars
                                </MenuItem>
                            </Select>
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", margin: "0 auto" }} />
                    )}
                    <SwitchModeButton />
                </Toolbar>
            </AppBar>
            {(useLocation().pathname === "/" || useLocation().pathname === "/posts") && (
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
            )}

            <AppDrawer drawerOpen={drawerOpen} closeDrawer={closeDrawer} />
        </>
    ) : (
        <></>
    );
};

export default Navigation;