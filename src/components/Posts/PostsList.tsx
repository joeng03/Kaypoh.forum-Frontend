import PostCard from "./PostCard";
import PostsNavigation from "./PostsNavigation";
import Loading from "../Loading";
import { acSetPosts } from "store/posts/action";
import { IPost } from "store/posts/types";
import { useAppSelector, useAppDispatch } from "store";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

type PostsListProps = {
    posts: IPost[];
};
const PostsList = ({ posts }: PostsListProps) => {
    return !posts ? (
        <Loading />
    ) : (
        <>
            <PostsNavigation />
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
