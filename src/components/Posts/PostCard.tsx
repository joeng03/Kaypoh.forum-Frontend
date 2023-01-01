import { IPost } from "store/posts/types";
import { IStar } from "store/user/types";
import { toastDeletePostSuccess, toastNotAuthorizedWarning, toastFormat } from "utils/constants";
import { acDeletePost } from "store/posts/action";
import { acUserStarPost, acUserUnStarPost } from "store/user/action";
import { useAppDispatch, useAppSelector } from "store";
import ConfirmationModal from "components/ConfirmationModal";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const extractContent = (html: string) => {
    return new DOMParser().parseFromString(html, "text/html").documentElement.textContent;
};
type PostCardMediaProps = {
    image: string;
    verticalLayout?: boolean;
};

const PostCardMedia = ({ image, verticalLayout = false }: PostCardMediaProps) => {
    return (
        <CardMedia
            image={image}
            sx={{
                height: verticalLayout ? "40%" : "100%",
                position: "relative",
            }}
        />
    );
};

type PostCardContentProps = {
    post_id: number;
    title: string;
    content: string;
    verticalLayout?: boolean;
};

const PostCardContent = ({ post_id, title, content, verticalLayout = false }: PostCardContentProps) => {
    return (
        <Link to={`/posts/${post_id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
            <CardContent sx={{ height: "100%", pb: 0, cursor: "pointer" }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        fontFamily: "Open Sans, sans-serif",
                        mb: verticalLayout ? "0.4rem " : "1rem",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: verticalLayout ? 3 : 4,
                        textAlign: "left",
                        wordWrap: "break-word",
                    }}
                >
                    {extractContent(content)}
                </Typography>
            </CardContent>
        </Link>
    );
};

type PostCardProps = { post: IPost };

const PostCard = ({ post }: PostCardProps) => {
    const user = useAppSelector((state) => state.user);

    const [cardRaised, setCardRaised] = useState<boolean>(true);
    const [starClicked, setStarClicked] = useState<boolean>(
        user.stars.find((star) => star.post_id === post.id) ? true : false,
    );
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [starsCount, setStarsCount] = useState<number>(post.stars_count);

    const dispatch = useAppDispatch();
    const theme = useTheme();

    // Use screen width to determine and adjust the PostCard layout
    const verticalLayout = useMediaQuery(theme.breakpoints.down("s"));
    const onModalOpen = () => setModalOpen(true);
    const onModalClose = () => setModalOpen(false);
    const handleDeletePost = () => {
        dispatch(acDeletePost(post.id))
            .then(() => toast.success(toastDeletePostSuccess, toastFormat))
            .catch(() => toast.warning(toastNotAuthorizedWarning, toastFormat));
    };
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
        <Card
            className="card noselect"
            onMouseEnter={() => setCardRaised(false)}
            onMouseLeave={() => setCardRaised(true)}
            raised={cardRaised}
            sx={{ height: verticalLayout ? "20rem" : "16rem", maxWidth: "40rem" }}
        >
            {" "}
            {post.tag && <Chip label={post.tag} size="small" color="secondary" className="chip" />}
            {verticalLayout ? (
                <>
                    <PostCardMedia image={post.image} verticalLayout={true} />
                    <PostCardContent
                        post_id={post.id}
                        title={post.title}
                        content={post.content}
                        verticalLayout={true}
                    />
                </>
            ) : (
                <Grid container height="80%">
                    <Grid item xs={4}>
                        <PostCardMedia image={post.image} />
                    </Grid>
                    <Grid item xs={8}>
                        <PostCardContent post_id={post.id} title={post.title} content={post.content} />
                    </Grid>
                </Grid>
            )}
            <div style={{ position: "absolute", bottom: "0", width: "100%" }}>
                <Divider />
                <Grid>
                    <CardActions sx={{ position: "relative" }}>
                        <Avatar
                            src={post.user.profile_picture}
                            component="a"
                            href=""
                            target="_blank"
                            className="avatar"
                        >
                            {post.user.username}
                        </Avatar>
                        <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>{post.user.username}</Typography>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                            {new Date(post.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </Typography>
                        {user.id === post.user.id && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    columnGap: "0.75rem",
                                    transform: "scale(0.55)",
                                }}
                            >
                                <Link to={`/writepost/${post.id}`}>
                                    <Fab color="primary" size="small" aria-label="edit">
                                        <EditIcon />
                                    </Fab>
                                </Link>

                                <Fab color="warning" size="small" aria-label="delete" onClick={onModalOpen}>
                                    <DeleteIcon />
                                </Fab>
                            </Box>
                        )}
                        <Box sx={{ position: "absolute", right: "0.4rem", display: "flex", alignItems: "center" }}>
                            <IconButton aria-label="star" onClick={handleStarClick} sx={{ p: "0.15rem" }}>
                                <Tooltip
                                    title={(starClicked ? "Unstar" : "Star") + " this post"}
                                    placement="bottom"
                                    disableInteractive
                                >
                                    <StarRoundedIcon sx={{ color: starClicked ? "icon.star" : "inherit" }} />
                                </Tooltip>
                            </IconButton>
                            {starsCount}
                        </Box>
                    </CardActions>
                </Grid>
            </div>
            <ConfirmationModal
                open={modalOpen}
                onClose={onModalClose}
                handleConfirm={handleDeletePost}
                confirmationText="Are you sure you want to delete this post?"
            />
        </Card>
    );
};

export default PostCard;
