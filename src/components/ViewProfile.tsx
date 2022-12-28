import { IUser } from "store/user/types";
import { useAppSelector } from "store";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ViewProfile = () => {
    const user = useAppSelector((state) => state.user);

    const handleUpdateProfile = () => {
        console.log("update profile");
    };
    return (
        <Box height="80vh">
            <Box
                component="form"
                noValidate
                onSubmit={handleUpdateProfile}
                maxWidth="xs"
                sx={{ m: "0 auto", mt: 3, width: "80vw", textAlign: "left" }}
            >
                <Avatar
                    src="https://www.biography.com/.image/t_share/MTM5ODkxNzYyODU1NDIwOTM4/ed-sheeran-gettyimages-494227430_1600jpg.jpg"
                    component="a"
                    href=""
                    target="_blank"
                    className="avatar"
                    sx={{ margin: "0 auto", width: "5rem", height: "5rem" }}
                ></Avatar>
                <Typography> Username: {user.username}</Typography>
                <Typography> Email:{user.email}</Typography>
                {"Joined " +
                    new Date(user.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
            </Box>
        </Box>
    );
};

export default ViewProfile;
