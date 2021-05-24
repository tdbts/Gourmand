import './NotesModal.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import Notes from './Notes/Notes';

const NotesModal = ({ isOpen, toggle, restaurant, notesManager }) => {
    return (
        <Modal className="notes-modal-container" {...{ isOpen, toggle }}>
            <ModalHeader {...{ toggle }}>{ restaurant && restaurant.name }</ModalHeader>
            <ModalBody>
                <Notes {...{ notesManager }} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={notesManager.add} size="sm">Add Note</Button>
            </ModalFooter>
        </Modal>
    );
};

export default NotesModal;
