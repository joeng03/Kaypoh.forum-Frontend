import { toastDeleteSuccess, toastNotAuthorizedWarning, toastFormat } from "../../utils/constants";
import { acDeleteTopic, acSetTopics } from "store/topics/action";
import { useAppDispatch, useAppSelector } from "store";
import ConfirmationModal from "components/ConfirmationModal";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import type { GridColDef, GridSelectionModel } from "@mui/x-data-grid";

const ForumTopics = () => {
    const topics = useAppSelector((state) => state.topics);
    const user = useAppSelector((state) => state.user);
    const columns: GridColDef[] = [
        { field: "name", headerName: "Topic", width: 100 },
        {
            field: "description",
            headerName: "Description",
            width: 200,
            flex: 1,
            editable: true,
        },
        {
            field: "username",
            headerName: "Created By",
            width: 120,
        },
        {
            field: "created_at",
            headerName: "Created on",
            width: 110,
            valueFormatter: (params) =>
                new Date(params.value).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
        },
        {
            field: "posts_count",
            headerName: "No. of Posts",
            width: 110,
        },
        {
            ...GRID_CHECKBOX_SELECTION_COL_DEF,
            headerName: "Subscribed",
            width: 130,
        },
    ];

    if (user.admin_level > 0) {
        columns.push({
            field: "id",
            headerName: "Edit/ Delete",
            width: 110,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "0.75rem",
                        transform: "scale(0.55)",
                    }}
                >
                    <Link to={`/writetopic/${params.value}`}>
                        <Fab color="primary" size="small" aria-label="edit">
                            <EditIcon />
                        </Fab>
                    </Link>

                    <Fab
                        color="warning"
                        size="small"
                        aria-label="delete"
                        onClick={() => {
                            setTopicID(params.value);
                            setModalOpen(true);
                        }}
                    >
                        <DeleteIcon />
                    </Fab>
                </Box>
            ),
        });
    }

    const [topicID, setTopicID] = useState<number>(-1);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    console.log(selectionModel);
    useEffect(() => {
        dispatch(acSetTopics());
        setSelectionModel(
            localStorage.getItem("subscribedTopics")
                ? JSON.parse(localStorage.getItem("subscribedTopics") as string)
                : [],
        );
    }, []);

    const dispatch = useAppDispatch();

    const onModalClose = () => setModalOpen(false);

    const handleDeleteTopic = () => {
        onModalClose();
        dispatch(acDeleteTopic(topicID))
            .then(() => toast.success(toastDeleteSuccess("topic"), toastFormat))
            .catch(() => toast.warning(toastNotAuthorizedWarning, toastFormat));
    };

    return (
        <Box
            sx={{
                height: "80vh",
                width: "95vw",
                m: "10vh auto 0",
            }}
        >
            <DataGrid
                rows={topics}
                columns={columns}
                initialState={{
                    sorting: {
                        sortModel: [{ field: "created_at", sort: "desc" }],
                    },
                }}
                pageSize={20}
                rowsPerPageOptions={[20]}
                experimentalFeatures={{ newEditingApi: true }}
                selectionModel={selectionModel}
                onSelectionModelChange={(ids) => {
                    console.log(ids);
                    setSelectionModel(ids);
                    localStorage.setItem("subscribedTopics", JSON.stringify(ids));
                }}
                sx={{
                    "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer:before": {
                        content: "'Subscribed'",
                        fontWeight: "bold",
                    },
                }}
                checkboxSelection
                disableSelectionOnClick
            />
            <ConfirmationModal
                open={modalOpen}
                onClose={onModalClose}
                handleConfirm={handleDeleteTopic}
                confirmationText="Are you sure you want to delete this topic? All posts under this topic would also be deleted."
            />
        </Box>
    );
};

export default ForumTopics;
