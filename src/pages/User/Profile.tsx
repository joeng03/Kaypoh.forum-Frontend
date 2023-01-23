import AppInput from "../../components/UI/Input/AppInput";
import { acUserUpdateProfile } from "store/user/action";
import { useAppSelector, useAppDispatch } from "store";
import fetchBlob from "services/blob";
import { validateEmail, validateUsername } from "config/validators";
import { toastUpdateProfileSuccess, toastUpdateProfileError, toastFormat } from "config/constants";
import React, { useState, useEffect, useRef } from "react";
import { trackPromise } from "react-promise-tracker";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SendIcon from "@mui/icons-material/Send";

/**
 * Displays the user profile page of the currently logged in user.
 * @returns React.Element
 */
const Profile = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [profilePic, setProfilePic] = useState<File>();
    const [emailErr, setEmailErr] = useState<string>("");
    const [usernameErr, setUsernameErr] = useState<string>("");

    const profilePicRef = useRef<HTMLImageElement>(null);

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setEmail(user.email);
        setUsername(user.username);
        setBio(user.bio ? user.bio : "");
        if (user.profile_picture) {
            fetchBlob(user.profile_picture).then((blob) => {
                const imageFile: File = new File([blob], "");
                showAndSetImage(imageFile);
            });
        }
    }, [user]);

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
        trackPromise(
            dispatch(acUserUpdateProfile(profileFormData))
                .then(() => {
                    toast.success(toastUpdateProfileSuccess, toastFormat);
                })
                .catch(() => toast.error(toastUpdateProfileError, toastFormat)),
        );
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
                sx={{
                    m: "0 auto",
                    mt: "3.5rem",
                    width: "80vw",
                    textAlign: "left",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "0.1rem",
                }}
            >
                <Avatar className="avatar" sx={{ margin: "0 auto", width: "7rem", height: "7rem" }}>
                    {" "}
                    <Box component="img" width="100%" ref={profilePicRef} sx={{ display: "block", pb: "0.5rem" }}></Box>
                </Avatar>
                <Box display="flex" justifyContent="space-between" p="1.8rem 0rem">
                    <Typography>
                        {"Joined 🎂 " +
                            new Date(user.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                    </Typography>
                    <Chip
                        label={user.admin_level > 0 ? "Community Leader" : "Community Member"}
                        size="small"
                        color={user.admin_level > 0 ? "secondary" : "default"}
                        sx={{ p: "0.9rem 0rem" }}
                    />
                </Box>
                <AppInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                    setMessage={setUsernameErr}
                    validate={validateUsername}
                    message={usernameErr}
                ></AppInput>
                <AppInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    setMessage={setEmailErr}
                    validate={validateEmail}
                    message={emailErr}
                ></AppInput>
                <AppInput
                    placeholder="Bio"
                    value={bio}
                    setValue={setBio}
                    setMessage={() => ""}
                    validate={() => ""}
                    message={""}
                    required={false}
                ></AppInput>

                <div style={{ marginTop: "3.5rem" }}>
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
                </div>
            </Box>
        </Box>
    );
};

export default Profile;
