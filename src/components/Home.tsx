import Post from "./Posts/Post";
import WritePost from "./Posts/WritePost";
import { acSetPosts } from "store/posts/action";
import { useAppSelector, useAppDispatch } from "store";
import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";

const Home = (): JSX.Element => {
    const posts = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(acSetPosts());
    }, []);
    return (
        <Grid container spacing={0.5} flexDirection="column">
            {posts.map((post) => (
                <Post key={post.id} {...post}></Post>
            ))}
        </Grid>
    );
};

export default Home;
