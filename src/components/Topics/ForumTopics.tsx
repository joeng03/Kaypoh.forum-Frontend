import { ITopic } from "store/topics/types";
import { acDeleteTopic } from "store/topics/action";
import { useAppDispatch, useAppSelector } from "store";
import { toastDeleteSuccess, toastNotAuthorizedWarning, toastFormat } from "../../utils/constants";
import ConfirmationModal from "components/ConfirmationModal";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ForumTopics = () => {
    // const topics = [
    //     { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    //     { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    //     { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    //     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    //     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    //     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    //     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    //     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    //     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    // ];

    const user = useAppSelector((state) => state.user);
    const topics = useAppSelector((state) => state.topics);

    const columns: GridColDef[] = [
        { field: "topic", headerName: "Topic", width: 90, editable: user.admin_level > 0 },
        {
            field: "description",
            headerName: "Description",
            width: 150,
            editable: user.admin_level > 0,
        },
        {
            field: "createdBy",
            headerName: "Created By",
            width: 150,
        },
        {
            field: "createdOn",
            headerName: "Created on",
            type: "date",
            width: 110,
            editable: true,
        },
        {
            field: "fullName",
            headerName: "Full name",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 160,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ""} ${params.row.lastName || ""}`,
        },
    ];

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onModalOpen = () => setModalOpen(true);
    const onModalClose = () => setModalOpen(false);
    const handleDeleteTopic = () => {
        console.log("");
        // dispatch(acDeleteTopic(topic.id))
        //     .then(() => toast.success(toastDeleteSuccess, toastFormat))
        //     .catch(() => toast.warning(toastNotAuthorizedWarning, toastFormat));
    };

    return (
        <>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={topics}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "0.75rem",
                    transform: "scale(0.55)",
                }}
            >
                <Link to={`/writetopic/${1}`}>
                    <Fab color="primary" size="small" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </Link>

                <Fab color="warning" size="small" aria-label="delete" onClick={onModalOpen}>
                    <DeleteIcon />
                </Fab>
            </Box>
            <ConfirmationModal
                open={modalOpen}
                onClose={onModalClose}
                handleConfirm={handleDeleteTopic}
                confirmationText="Are you sure you want to delete this topic? All posts under this topic would also be deleted."
            />
        </>
    );
};

export default ForumTopics;
