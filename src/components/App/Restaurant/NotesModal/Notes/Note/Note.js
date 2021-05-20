import './Note.css';
import {
    Container
} from 'reactstrap';
import { useEditable } from "use-editable";
import { useRef, useCallback } from "react";
import Linkify from 'react-linkify';

const Note = ({ text, onNoteChange, disabled, disable }) => {
    const ref = useRef(null);

    useEditable(ref, useCallback(onNoteChange, []), {
        disabled
    });

    return (
        <Container className="note-container">
            <div {...{ ref }} className={`note-text ${disabled ? "" : "editable"}`} onBlur={disable}>
                <Linkify>
                    {text}
                </Linkify>
            </div>
        </Container>
    );
};

export default Note;
