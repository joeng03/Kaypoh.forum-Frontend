import React from "react";

type CommentProps = {
    post_id: string;
    user_id: string;
    content: string;
    reputation: string;
    created_at: Date;
    updated_at: Date;
};

const Comment = (props: CommentProps): JSX.Element => {
    return <></>;
};

export default Comment;
