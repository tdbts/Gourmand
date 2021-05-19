import './NotesModal.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import Notes from './Notes/Notes';

const NotesModal = ({ isOpen, toggle, notes, restaurant, updateNote, removeNote, currentlyEditableNote, setCurrentlyEditableNote, addNote }) => {
    return (
        <Modal className="notes-modal-container" {...{ isOpen, toggle }}>
            <ModalHeader {...{ toggle }}>{ restaurant && restaurant.name }</ModalHeader>
            <ModalBody>
                <Notes {...{ notes, updateNote, removeNote, currentlyEditableNote, setCurrentlyEditableNote }} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={addNote} size="sm">Add Note</Button>
            </ModalFooter>
        </Modal>
    );
};

export default NotesModal;
