import { useAppDispatch } from "store";
import { acSetPosts } from "store/posts/action";
import React, { useState, useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    width: "30vw",
    maxWidth: theme.breakpoints.values.xs,
    color: "inherit",
}));

const PostsNavigation = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [columnName, setColumnName] = useState<string>("title");
    const [sortBy, setSortBy] = useState<string>("created_at DESC");
    const [page, setPage] = useState<number>(1);

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

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(acSetPosts(page, columnName, searchValue, sortBy));
    };

    return (
        <>
            <AppBar position="fixed" color="transparent" sx={{ backdropFilter: "blur(20px)", overflow: "scroll" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer button"
                        sx={{ mr: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {
                        <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", margin: "0 auto" }}>
                            <StyledInputBase
                                value={searchValue}
                                onChange={({ target }) => setSearchValue(target.value)}
                                placeholder="Search…"
                            />
                            <Button type="submit" endIcon={<SearchIcon />} sx={{ p: 0 }} />
                            <InputLabel
                                sx={{ display: { xxs: "none", m: "flex" }, alignItems: "center", mr: "0.5rem" }}
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
                                sx={{ display: { xxs: "none", m: "flex" }, alignItems: "center", mr: "0.5rem" }}
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
                    }
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
        </>
    );
};

export default PostsNavigation;
