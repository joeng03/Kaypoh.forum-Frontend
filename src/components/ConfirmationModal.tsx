import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ConfirmationModalProps = {
    open: boolean;
    onClose: () => void;
    handleConfirm: () => void;
    confirmationText: string;
};

const ConfirmationModal = ({ open, onClose, handleConfirm, confirmationText }: ConfirmationModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{
                backdrop: Backdrop,
            }}
        >
            <Fade in={open} timeout={{ enter: 700, exit: 400 }}>
                <Box className="modal">
                    <Typography variant="body1">{confirmationText}</Typography>
                    <Typography variant="body1" fontWeight="bold">
                        This action is irreversible.
                    </Typography>
                    <Button
                        component="label"
                        variant="outlined"
                        size="small"
                        color="warning"
                        onClick={handleConfirm}
                        sx={{
                            m: "0 auto",
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ConfirmationModal;
