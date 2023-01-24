import { useAppSelector } from "store";
import React, { useState, useEffect } from "react";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const StyledBox = styled(Box)(({ theme }) => ({
    width: "100vw",
    position: "fixed",
    bottom: 0,
    padding: "0.3rem 0rem",
    zIndex: 2,
    background: theme.palette.mode === "light" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    backdropFilter: "blur(30px)",
    color: "transparent",
}));

type AppPaginationProps = {
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const AppPagination = ({ page, onChange }: AppPaginationProps) => {
    const [count, setCount] = useState<number>(100);

    return (
        <StyledBox>
            <Pagination
                count={count}
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
