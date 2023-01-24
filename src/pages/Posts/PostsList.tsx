import PostCard from "../../components/Posts/PostCard";
import { useAppSelector } from "store";
import React from "react";
import Box from "@mui/material/Box";

const PostsList = () => {
    const posts = useAppSelector((state) => state.posts);
    return (
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
