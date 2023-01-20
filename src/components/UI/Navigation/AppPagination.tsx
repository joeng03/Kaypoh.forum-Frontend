import React from "react";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const StyledBox = styled(Box)(({ theme }) => ({
    width: "100vw",
    position: "fixed",
    bottom: 0,
    padding: "0.3rem 0rem",
    zIndex: 1,
    background: theme.palette.mode === "light" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    backdropFilter: "blur(30px)",
    color: "transparent",
}));

type AppPaginationProps = {
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const AppPagination = ({ page, onChange }: AppPaginationProps) => {
    return (
        <StyledBox>
            <Pagination
                count={100}
                variant="outlined"
                color="primary"
                page={page}
                onChange={onChange}
                sx={{ display: "inline-block" }}
            />
        </StyledBox>
    );
};

export default AppPagination;
