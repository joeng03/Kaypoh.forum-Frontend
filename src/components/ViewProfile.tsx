import Input from "./Input";
import { acUserUpdateProfile } from "store/user/action";
import { useAppSelector, useAppDispatch } from "store";
import fetchBlob from "services/blob";
import { validateEmail, validateUsername, validatePassword } from "utils/validators";
import { toastUpdateProfileSuccess, toastUpdateProfileError, toastFormat } from "utils/constants";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SendIcon from "@mui/icons-material/Send";

const ViewProfile = () => {
    const [createdAt, setCreatedAt] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [profilePic, setProfilePic] = useState<File>();

    const [emailErr, setEmailErr] = useState<string>("");
    const [usernameErr, setUsernameErr] = useState<string>("");
    const [bioErr, setBioErr] = useState<string>("");

    const profilePicRef = useRef<HTMLImageElement>(null);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log(user);

    useEffect(() => {
        setCreatedAt(user.created_at);
        setEmail(user.email);
        setUsername(user.username);
        setBio(user.bio);
        if (user.profile_picture) {
            fetchBlob(user.profile_picture).then((blob) => {
                const imageFile: File = new File([blob], "");
                showAndSetImage(imageFile);
            });
        }
    }, []);

    const handleUpdateProfile = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const profileFormData = new FormData();

        /*
        The profileFormData keys follow the Rails parameter naming conventions
        https://guides.rubyonrails.org/v3.2.13/form_helpers.html#understanding-parameter-naming-conventions
        */
        profileFormData.append("user[email]", email);
        profileFormData.append("user[username]", username);
        profileFormData.append("user[bio]", bio);

        if (profilePic) {
            profileFormData.append("user[profile_picture]", profilePic as Blob);
        }
        dispatch(acUserUpdateProfile(profileFormData))
            .then(() => {
                toast.success(toastUpdateProfileSuccess, toastFormat);
            })
            .catch(() => toast.error(toastUpdateProfileError, toastFormat));
    };
    const showAndSetImage = (file: File) => {
        if (profilePicRef.current) {
            profilePicRef.current.src = URL.createObjectURL(file);
        }
        setProfilePic(file);
    };
    return (
        <Box height="80vh">
            <Box
                component="form"
                noValidate
                onSubmit={handleUpdateProfile}
                maxWidth="xs"
                sx={{ m: "0 auto", mt: 3, width: "80vw", textAlign: "left", position: "relative" }}
            >
                <Avatar className="avatar" sx={{ margin: "0 auto", width: "7rem", height: "7rem" }}>
                    {" "}
                    <Box component="img" width="100%" ref={profilePicRef} sx={{ display: "block", pb: "0.5rem" }}></Box>
                </Avatar>
                <Typography p="1.5rem 0rem">
                    {"Joined on " +
                        new Date(createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                </Typography>
                <Input
                    id="Username"
                    label="Username"
                    name="Username"
                    autoComplete="given-name"
                    value={username}
                    setValue={setUsername}
                    setMessage={setUsernameErr}
                    validate={validateUsername}
                    autoFocus
                    message={usernameErr}
                ></Input>

                <Input
                    id="email"
                    label="Email adress"
                    name="email"
                    autoComplete="email"
                    value={email}
                    setValue={setEmail}
                    setMessage={setEmailErr}
                    validate={validateEmail}
                    message={emailErr}
                ></Input>
                <Input
                    id="bio"
                    label="Bio"
                    name="bio"
                    autoComplete="bio"
                    value={bio}
                    setValue={setBio}
                    setMessage={setBioErr}
                    validate={() => ""}
                    message={bioErr}
                ></Input>

                <Button component="label" variant="outlined" size="small" endIcon={<FileUploadOutlinedIcon />}>
                    Upload Profile Picture
                    <input
                        accept="image/*"
                        type="file"
                        onChange={({ target }) => showAndSetImage((target.files as FileList)[0])}
                        hidden
                    />
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    endIcon={<SendIcon />}
                    sx={{ m: "0 auto", position: "absolute", right: "0.2rem" }}
                >
                    Update profile
                </Button>
            </Box>
        </Box>
    );
};

export default ViewProfile;
