import './Note.css';
import {
    Container
} from 'reactstrap';
import { useEditable } from "use-editable";
import { useRef, useCallback } from "react";

const Note = ({ text, onNoteChange, disabled, disable }) => {
    const ref = useRef(null);

    useEditable(ref, useCallback(onNoteChange, []), {
        disabled
    });

    return (
        <Container className="note-container">
            <div {...{ ref }} className={`note-text ${disabled ? "" : "editable"}`} onBlur={disable}>
                {text}
            </div>
        </Container>
    );
};

export default Note;
