import WritePost from "./WritePost";
import { IPost } from "store/posts/types";
import { BASE_URL } from "utils/endpoints";
import { acUpdatePost, acDeletePost } from "store/posts/action";
import { useAppDispatch, useAppSelector } from "store";
import "../../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    Typography,
    Tooltip,
} from "@mui/material";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const postStyle = {
    position: "relative",
    margin: "0 auto",
    transition: "0.3s",
    height: "20rem",
    width: "30em",
    mt: "2rem",
    borderRadius: ".625rem!important",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.2)",
    },
};
const chipStyle = {
    top: "0.8em",
    right: "0.8em",
    position: "absolute",
    backgroundColor: "secondary",
    fontSize: "0.85em",
};

const fabStyle = {
    //transform: "scale(0.5)",
};

const avatarStyle = {
    marginRight: "0.4em",
    border: "0.1rem solid",
};

const sanitizeData = (data: string) => ({
    __html: DOMPurify.sanitize(data),
});

type PostProps = IPost;

const Post = (props: PostProps): JSX.Element => {
    const handleStarClick = () => {
        dispatch(
            acUpdatePost(
                {
                    ...props,
                    stars: starClicked ? props.stars - 1 : props.stars + 1,
                },
                props.id,
                "star",
            ),
        );
        setStarClicked(!starClicked);
    };
    const user = useAppSelector((state) => state.user);
    const [starClicked, setStarClicked] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    return (
        <Card raised className="noselect" sx={postStyle}>
            <CardMedia image={BASE_URL + props.image} sx={{ height: "40%", position: "relative" }}>
                {user.id === props.user.id && (
                    <Box
                        sx={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "0.5rem",
                            transform: "scale(0.55)",
                        }}
                    >
                        <Link to={`/writepost/${props.id}`}>
                            <Fab color="primary" size="small" aria-label="edit" sx={fabStyle} LinkComponent={Link}>
                                <EditIcon />
                            </Fab>
                        </Link>

                        <Fab color="warning" size="small" aria-label="delete" sx={fabStyle}>
                            <DeleteIcon />
                        </Fab>
                    </Box>
                )}
                {props.tag && <Chip label={props.tag} size="small" color="secondary" sx={chipStyle} />}
            </CardMedia>
            <Link to={`/posts/${props.id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                <CardContent sx={{ cursor: "pointer", textDecoration: "none" }}>
                    <Typography
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            fontFamily: "Open Sans, sans-serif",
                            mb: "0.4rem ",
                        }}
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={sanitizeData(props.content)}
                        sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
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
                    sx={avatarStyle}
                >
                    {props.user.username}
                </Avatar>
                <Typography sx={{ fontSize: "0.9em" }}>{props.user.username}</Typography>
                <Typography sx={{ fontSize: "0.9em" }}>
                    {new Date(props.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </Typography>
                <IconButton aria-label="star" sx={{ position: "absolute", right: "0" }} onClick={handleStarClick}>
                    <Tooltip title="Star this post" placement="bottom" disableInteractive>
                        <StarRoundedIcon sx={{ color: starClicked ? "icon.star" : "inherit" }} />
                    </Tooltip>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Post;
