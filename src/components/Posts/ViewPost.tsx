import { useAppDispatch, useAppSelector } from "store";
import { acUpdatePost } from "store/posts/action";
import { IPost } from "store/posts/types";
import { BASE_URL } from "utils/endpoints";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const avatarStyle = {
    border: "0.1rem solid",
};
const chipStyle = {
    top: "0.8em",
    right: "0.8em",
    position: "absolute",
    backgroundColor: "secondary",
    fontSize: "0.85em",
};

const sanitizeData = (data: string) => ({
    __html: DOMPurify.sanitize(data),
});

type ViewPostProps = {
    post: IPost;
};
const ViewPost = ({ post }: ViewPostProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const [starClicked, setStarClicked] = useState<boolean>(false);

    // useEffect(() => {
    //     if (post) {
    //         console.log(post.updated_at);
    //         console.log(post.created_at);
    //     }
    // }, [post]);

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

    const handleCommentClick = () => {
        console.log("comment");
    };

    return post.id === -1 ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <CircularProgress color="inherit" />
        </Box>
    ) : (
        <Box
            sx={{
                mt: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box display="flex" flexDirection="row" columnGap="0.5rem">
                <Typography variant="h4" fontWeight="bold" fontFamily={"'Open Sans',sans-serif "}>
                    {post.title}{" "}
                </Typography>
                {post.tag && <Chip label={post.tag} size="medium" color="secondary" />}
            </Box>
            <Box
                component="img"
                width="80%"
                maxWidth="m"
                src={BASE_URL + post.image}
                sx={{ display: "block", pb: "0.5rem" }}
            ></Box>

            <Grid container>
                <Grid item xs={10.5}>
                    <Box display="flex" flexDirection="row" columnGap="0.5rem" alignItems="center">
                        <Avatar src={post.user.profilePic} component="a" href="" target="_blank" sx={avatarStyle}>
                            {post.user.username}
                        </Avatar>
                        <Box>
                            <Typography variant="h5">{post.user.username}</Typography>{" "}
                            <Typography sx={{ fontSize: "0.9em" }}>
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
                <Grid item xs={1.5}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <IconButton aria-label="star" onClick={handleStarClick}>
                            <Tooltip title="Star this post" placement="bottom" disableInteractive>
                                <StarRoundedIcon sx={{ color: starClicked ? "icon.star" : "inherit" }} />
                            </Tooltip>
                        </IconButton>
                        <IconButton aria-label="comment" onClick={handleCommentClick}>
                            <Tooltip title="Comments" placement="bottom" disableInteractive>
                                <ChatBubbleOutlineRoundedIcon />
                            </Tooltip>
                        </IconButton>
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
        </Box>
    );
};

export default ViewPost;
