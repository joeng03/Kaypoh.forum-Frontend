import { IPost } from "store/posts/types";
import { IStar } from "store/user/types";
import { BASE_URL } from "utils/endpoints";
import { toastDeletePostSuccess, toastNotAuthorizedWarning, toastFormat } from "utils/constants";
import { acDeletePost } from "store/posts/action";
import { acUserStarPost, acUserUnStarPost } from "store/user/action";
import { useAppDispatch, useAppSelector } from "store";
import ConfirmationModal from "components/ConfirmationModal";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DOMPurify from "isomorphic-dompurify";
import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardContent,
    Chip,
    Divider,
    Fab,
    Grid,
    IconButton,
    useTheme,
    Modal,
    Typography,
    Tooltip,
} from "@mui/material";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
        >
            <CardMedia image={BASE_URL + post.image} sx={{ height: "35%", position: "relative" }}>
                {user.id === post.user.id && (
                    <Box
                        sx={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "0.5rem",
                            transform: "scale(0.55)",
                        }}
                    >
                        <Link to={`/writepost/${post.id}`}>
                            <Fab color="primary" size="small" aria-label="edit" LinkComponent={Link}>
                                <EditIcon />
                            </Fab>
                        </Link>

                        <Fab color="warning" size="small" aria-label="delete" onClick={onModalOpen}>
                            <DeleteIcon />
                        </Fab>
                    </Box>
                )}
                {post.tag && <Chip label={post.tag} size="small" color="secondary" sx={chipStyle} />}
            </CardMedia>
            <Link to={`/posts/${post.id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                <CardContent sx={{ height: "47%", cursor: "pointer" }}>
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            fontFamily: "Open Sans, sans-serif",
                            mb: "0.4rem ",
                        }}
                    >
                        {post.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={sanitizeData(post.content)}
                        sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            textAlign: "left",
                        }}
                    ></Typography>
                </CardContent>
            </Link>
            <Divider />
            <CardActions sx={{ position: "relative" }}>
                <Avatar
                    src="https://www.biography.com/.image/t_share/MTM5ODkxNzYyODU1NDIwOTM4/ed-sheeran-gettyimages-494227430_1600jpg.jpg"
                    component="a"
                    href=""
                    target="_blank"
                    className="avatar"
                >
                    {post.user.username}
                </Avatar>
                <Typography sx={{ fontSize: "0.9em", fontWeight: "bold" }}>{post.user.username}</Typography>
                <Typography sx={{ fontSize: "0.9em" }}>
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </Typography>
                <Box sx={{ position: "absolute", right: "0.4rem", display: "flex", alignItems: "center" }}>
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
                </Box>
            </CardActions>
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
