import PostCard from "./PostCard";
import PostsNavigation from "../Navigation";
import Loading from "../Loading";
import { acSetPosts } from "store/posts/action";
import { IPost } from "store/posts/types";
import { useAppDispatch, useAppSelector } from "store";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";

const PostsList = () => {
    const posts = useAppSelector((state) => state.posts);

    return !posts ? (
        <Loading />
    ) : (
        <Box m="3.5rem 0rem">
            <Box display="flex" flexDirection="column">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </Box>
        </Box>
    );
};

export default PostsList;
