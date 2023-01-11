import ViewComment from "./ViewComment";
import WriteComment from "./WriteComment";
import ConfirmationModal from "components/ConfirmationModal";
import { useAppDispatch, useAppSelector } from "store";
import { acDeleteComment } from "store/comments/action";
import { IComment } from "store/comments/types";
import { toastDeleteSuccess, toastNotAuthorizedWarning, toastFormat } from "utils/constants";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import SentimentNeutralRoundedIcon from "@mui/icons-material/SentimentNeutralRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";

type CommentCardProps = {
    comment: IComment;
    method: "create" | "update";
};

const CommentCard = ({ comment, method }: CommentCardProps) => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [isView, setIsView] = useState<boolean>(method === "update");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [cardRaised, setCardRaised] = useState<boolean>(true);

    const onModalOpen = () => setModalOpen(true);
    const onModalClose = () => setModalOpen(false);
    const handleDeleteComment = () => {
        dispatch(acDeleteComment(comment.id))
            .then(() => toast.success(toastDeleteSuccess("comment"), toastFormat))
            .catch(() => toast.warning(toastNotAuthorizedWarning, toastFormat));
    };

    return (
        <Card
            className="card"
            onMouseEnter={() => setCardRaised(false)}
            onMouseLeave={() => setCardRaised(true)}
            raised={cardRaised}
            sx={{ maxWidth: "48rem", height: "11.5rem" }}
        >
            <Grid container spacing={0.5} height="100%" sx={{ overflow: "scroll" }}>
                <Grid item xs={2} mt="0.8rem">
                    <Box display="flex" flexDirection="row">
                        <Box>
                            <Avatar src={comment.user.profile_picture} className="avatar">
                                {comment.user.username}
                            </Avatar>

                            {method === "update" && user.id === comment.user.id && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: "0.5rem",
                                        transform: "scale(0.55)",
                                    }}
                                >
                                    <Fab
                                        color="primary"
                                        size="small"
                                        aria-label="edit"
                                        onClick={() => setIsView(false)}
                                    >
                                        <EditIcon />
                                    </Fab>

                                    <Fab color="warning" size="small" aria-label="delete" onClick={onModalOpen}>
                                        <DeleteIcon />
                                    </Fab>
                                </Box>
                            )}
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "0.9em", fontWeight: "bold", margin: "0 auto" }}>
                                {comment.user.username}
                            </Typography>{" "}
                            <Typography sx={{ fontSize: "0.7em" }}>
                                {isView
                                    ? new Date(comment.created_at).toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      })
                                    : new Date().toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      })}
                            </Typography>
                        </Box>
                    </Box>
                    {isView && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                ml: "0.2rem",
                                position: "absolute",
                                bottom: "0.8rem",
                                borderRadius: "50%",
                            }}
                        >
                            <Typography variant="caption"> Sentiment: </Typography>
                            {/* {comment.sentiment} */}
                            {comment.sentiment < 0 ? (
                                <SentimentDissatisfiedRoundedIcon sx={{ color: "icon.negative" }} />
                            ) : comment.sentiment > 0.25 ? (
                                <SentimentSatisfiedAltRoundedIcon sx={{ color: "icon.positive" }} />
                            ) : (
                                <SentimentNeutralRoundedIcon sx={{ color: "icon.neutral" }} />
                            )}
                        </Box>
                    )}
                </Grid>
                <Grid item xs={10}>
                    <CardContent>
                        {isView ? (
                            <ViewComment content={comment.content} />
                        ) : (
                            <WriteComment comment={comment} method={method} onCancel={() => setIsView(true)} />
                        )}
                    </CardContent>
                </Grid>
            </Grid>
            <ConfirmationModal
                open={modalOpen}
                onClose={onModalClose}
                handleConfirm={handleDeleteComment}
                confirmationText="Are you sure you want to delete this comment?"
            />
        </Card>
    );
};
export default CommentCard;
