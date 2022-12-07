import React from "react";
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
    IconButton,
    useTheme,
    Typography,
} from "@mui/material";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
type PostProps = {
    id: number;
    user_id: number;
    title: string;
    content: string;
    reputation: number;
    tag: string;
    image: string;
    created_at: Date;
    updated_at: Date;
};

const postStyle = {
    position: "relative",
    margin: "0 auto",
    transition: "0.3s",
    height: "20rem",
    width: "30em",
    borderRadius: ".625rem!important",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.2)",
    },
    cursor: "pointer",
};
const chipStyle = {
    top: "0.8em",
    right: "0.8em",
    position: "absolute",
    backgroundColor: "primary",
    fontSize: "0.85em",
};

const avatarStyle = {
    marginRight: "0.4em",
    border: "0.1rem solid",
};

const Post = (props: PostProps): JSX.Element => {
    const theme = useTheme();
    return (
        <Card raised sx={postStyle}>
            <CardMedia image={props.image} sx={{ height: "40%", position: "relative" }}>
                <Chip label={props.tag} size="small" color="secondary" sx={chipStyle} />
            </CardMedia>
            <CardContent>
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", mb: "0.4em" }}>{props.title}</Typography>
                <Typography
                    variant="body1"
                    sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        fontFamily: "Open Sans, sans-serif",
                        textAlign: "left",
                    }}
                >
                    {props.content}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ position: "relative" }}>
                <Avatar
                    src="https://www.biography.com/.image/t_share/MTM5ODkxNzYyODU1NDIwOTM4/ed-sheeran-gettyimages-494227430_1600jpg.jpg"
                    component="a"
                    href=""
                    target="_blank"
                    sx={avatarStyle}
                >
                    {props.user_id}
                </Avatar>
                <Typography sx={{ fontSize: "0.9em" }}>{"Ed Sheeran"}</Typography>
                <Typography sx={{ fontSize: "0.9em" }}>
                    {props.created_at.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </Typography>
                <IconButton aria-label="upvote" sx={{ position: "absolute", right: "0" }}>
                    <StarRoundedIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Post;
