import "../../App.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

type ContentEditorProps = {
    editorState: EditorState;
    setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
    placeholder: string;
};

const ContentEditor = (props: ContentEditorProps) => {
    return (
        <Editor
            editorState={props.editorState}
            onEditorStateChange={props.setEditorState}
            placeholder={props.placeholder}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
                blockType: {
                    className: "toolbar-darkmode",
                },
                fontSize: {
                    className: "toolbar-darkmode",
                },
                fontFamily: {
                    className: "toolbar-darkmode",
                },
                colorPicker: {
                    popupClassName: "toolbar-darkmode",
                },
                link: {
                    popupClassName: "toolbar-darkmode",
                },
                embedded: {
                    popupClassName: "toolbar-darkmode",
                },
                image: {
                    popupClassName: "toolbar-darkmode",
                },
            }}
        />
    );
};

export default ContentEditor;
