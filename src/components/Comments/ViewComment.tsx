import React, { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const maxDisplayLength = 100;
const sanitizeData = (data: string) => ({
    __html: DOMPurify.sanitize(data),
});

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
            <Typography
                dangerouslySetInnerHTML={sanitizeData(
                    exceededDisplayLength && isReadMore ? content.slice(0, maxDisplayLength) : content,
                )}
                sx={{ textAlign: "left" }}
            />
            {exceededDisplayLength && (
                <Typography onClick={toggleReadMore}>{isReadMore ? "...read more" : " show less"}</Typography>
            )}
        </Box>
    );
};

export default ViewComment;
