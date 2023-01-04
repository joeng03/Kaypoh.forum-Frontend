import PostCard from "./PostCard";
import PostsNavigation from "../Navigation";
import Loading from "../Loading";
import { IPost } from "store/posts/types";
import React from "react";
import Box from "@mui/material/Box";

type PostsListProps = {
    posts: IPost[];
};
const PostsList = ({ posts }: PostsListProps) => {
    return !posts ? (
        <Loading />
    ) : (
        <>
            <Box m="3.5rem 0rem">
                <Box display="flex" flexDirection="column">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default PostsList;
