import { useAppDispatch, useAppSelector } from "store";
import { acUserStarPost, acUserUnStarPost } from "store/user/action";
import { initialPostState, IPost } from "store/posts/types";
import { IStar } from "store/user/types";
import { readOne } from "services/posts";
import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
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
import { trackPromise } from "react-promise-tracker";

const sanitizeData = (data: string) => ({
    __html: DOMPurify.sanitize(data),
});

const ViewPost = () => {
    const user = useAppSelector((state) => state.user);

    const [post, setPost] = useState<IPost>(initialPostState);
    const [starClicked, setStarClicked] = useState<boolean>(false);
    const [starsCount, setStarsCount] = useState<number>(0);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            trackPromise(
                readOne(Number(id))
                    .then((post) => {
                        setPost(post);
                        setStarsCount(post.stars_count);
                        setStarClicked(user.stars.find((star) => star.post_id === post.id) ? true : false);
                    })
                    .catch(() => navigate("/notfound")),
            );
        }
    }, []);

    const handleStarClick = () => {
        if (starClicked) {
            const star_id = (user.stars.find((star) => star.post_id === post.id) as IStar).id;
            dispatch(acUserUnStarPost(user, star_id));
            setStarsCount(starsCount - 1);
        } else {
            const star: IStar = {
                id: -1,
                user_id: user.id,
                post_id: post.id,
            };
            dispatch(acUserStarPost(user, star));
            setStarsCount(starsCount + 1);
        }
        setStarClicked(!starClicked);
    };

    return (
        <>
            {post.id !== -1 && (
                <Box
                    sx={{
                        m: "0 auto ",
                        mt: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "87vw",
                    }}
                >
                    <Box display="flex" flexDirection="row" columnGap="0.5rem" alignItems="center" pb="0.75rem">
                        <Typography variant="h4" fontWeight="bold" fontFamily={"'Open Sans',sans-serif "}>
                            {post.title}{" "}
                        </Typography>
                        {post.topic.name && (
                            <Chip
                                label={post.topic.name}
                                size="medium"
                                color="secondary"
                                className="noselect"
                                sx={{ ml: "0.5rem" }}
                            />
                        )}
                    </Box>
                    <Box
                        component="img"
                        width="80%"
                        maxWidth="m"
                        src={post.image}
                        sx={{ display: "block", pb: "0.5rem" }}
                    ></Box>

                    <Grid container position="relative">
                        <Grid item xs={9.5}>
                            <Box display="flex" flexDirection="row" columnGap="0.5rem" alignItems="center">
                                <Avatar src={post.user.profile_picture} className="avatar">
                                    {post.user.username}
                                </Avatar>
                                <Box>
                                    <Typography variant="h5">{post.user.username}</Typography>{" "}
                                    <Typography textAlign="right" fontSize="0.7rem">
                                        Posted on{" "}
                                        {new Date(post.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </Typography>
                                    {post.created_at !== post.updated_at && (
                                        <Typography textAlign="right" fontSize="0.7rem">
                                            Updated on{" "}
                                            {new Date(post.updated_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={2.5} position="absolute" right={0}>
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <IconButton aria-label="star" onClick={handleStarClick} sx={{ p: 0 }}>
                                    <Tooltip
                                        title={(starClicked ? "Unstar" : "Star") + " this post"}
                                        placement="bottom"
                                        disableInteractive
                                    >
                                        <StarRoundedIcon sx={{ color: starClicked ? "icon.star" : "inherit" }} />
                                    </Tooltip>
                                </IconButton>
                                {starsCount}
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

                    <Typography
                        dangerouslySetInnerHTML={sanitizeData(post.content)}
                        sx={{ textAlign: "left" }}
                    ></Typography>
                    <Outlet />
                </Box>
            )}
        </>
    );
};

export default ViewPost;
