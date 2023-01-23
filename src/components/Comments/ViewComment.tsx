import React, { useState } from "react";
import Box from "@mui/material/Box";

const maxDisplayLength = 300;

type ViewCommentProps = {
    content: string;
};

const ViewComment = ({ content }: ViewCommentProps) => {
    const exceededDisplayLength = content.length > maxDisplayLength;

    const [isReadMore, setIsReadMore] = useState<boolean>(exceededDisplayLength);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <Box>
            {exceededDisplayLength ? (
                isReadMore ? (
                    <>
                        <p>
                            {content.slice(0, maxDisplayLength)}
                            <span onClick={toggleReadMore} style={{ cursor: "pointer", fontWeight: "bold'" }}>
                                {" ...read more"}
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            {content}
                            <span onClick={toggleReadMore} style={{ cursor: "pointer", fontWeight: "bold" }}>
                                {" show less"}
                            </span>
                        </p>
                    </>
                )
            ) : (
                content
            )}
        </Box>
    );
};

export default ViewComment;
