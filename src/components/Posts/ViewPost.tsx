import { useAppDispatch, useAppSelector } from "store";
import { acUpdatePost } from "store/posts/action";
import { acSetComments } from "store/comments/action";
import { IPost } from "store/posts/types";
import { BASE_URL } from "utils/endpoints";
import Loading from "components/Loading";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import DOMPurify from "isomorphic-dompurify";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CircularProgress from "@mui/material/CircularProgress";

const sanitizeData = (data: string) => ({
    __html: DOMPurify.sanitize(data),
});

type ViewPostProps = {
    post: IPost;
};
const ViewPost = ({ post }: ViewPostProps) => {
    const dispatch = useAppDispatch();
    const [starClicked, setStarClicked] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // useEffect(() => {
    //     console.log(post);
    //     if (post) {
    //         console.log(post.updated_at);
    //         console.log(post.created_at);
    //     }
    // }, [post]);
    const onModalOpen = () => setModalOpen(true);
    const onModalClose = () => setModalOpen(false);
    const handleStarClick = () => {
        dispatch(
            acUpdatePost(
                {
                    ...post,
                    stars: starClicked ? post.stars - 1 : post.stars + 1,
                },
                post.id,
                "star",
            ),
        );

        setStarClicked(!starClicked);
    };

    return post.id === -1 ? (
        <Loading />
    ) : (
        <Box
            sx={{
                m: "0 auto ",
                mt: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "90vw",
            }}
        >
            <Box display="flex" flexDirection="row" columnGap="0.5rem" alignItems="center">
                <Typography variant="h4" fontWeight="bold" fontFamily={"'Open Sans',sans-serif "}>
                    {post.title}{" "}
                </Typography>
                {post.tag && (
                    <Chip label={post.tag} size="medium" color="secondary" className="noselect" sx={{ ml: "0.5rem" }} />
                )}
            </Box>
            <Box
                component="img"
                width="80%"
                maxWidth="m"
                src={BASE_URL + post.image}
                sx={{ display: "block", pb: "0.5rem" }}
            ></Box>

            <Grid container position="relative">
                <Grid item xs={9.5}>
                    <Box display="flex" flexDirection="row" columnGap="0.5rem" alignItems="center">
                        <Avatar src={post.user.profilePic} component="a" href="" target="_blank" className="avatar">
                            {post.user.username}
                        </Avatar>
                        <Box>
                            <Typography variant="h5">{post.user.username}</Typography>{" "}
                            <Typography variant="body2">
                                Posted on{" "}
                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={2.5} position="absolute" right={0}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <IconButton aria-label="star" onClick={handleStarClick}>
                            <Tooltip title="Star this post" placement="bottom" disableInteractive>
                                <StarRoundedIcon sx={{ color: starClicked ? "icon.star" : "inherit" }} />
                            </Tooltip>
                        </IconButton>

                        <Link to={"comments"}>
                            <IconButton aria-label="comment">
                                <Tooltip title="Comments" placement="bottom" disableInteractive>
                                    <ChatBubbleOutlineRoundedIcon />
                                </Tooltip>
                            </IconButton>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
            {/* {post.created_at != post.updated_at && (
                <Typography sx={{ fontSize: "0.9em" }}>
                    Updated on{" "}
                    {new Date(post.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </Typography>
            )} */}
            <Typography dangerouslySetInnerHTML={sanitizeData(post.content)} sx={{ textAlign: "left" }}></Typography>
            <Outlet />
        </Box>
    );
};

export default ViewPost;
