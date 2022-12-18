import Post from "./Posts/Post";
import Loading from "./Loading";
import { IPost } from "store/posts/types";
import { useAppSelector, useAppDispatch } from "store";
import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";

type HomeProps = {
    posts: IPost[];
};
const Home = ({ posts }: HomeProps): JSX.Element => {
    return !posts ? (
        <Loading />
    ) : (
        <Grid container spacing={0.5} flexDirection="column" sx={{ mb: "8" }}>
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </Grid>
    );
};

export default Home;
