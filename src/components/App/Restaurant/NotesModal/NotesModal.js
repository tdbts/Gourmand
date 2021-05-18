import './NotesModal.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import Notes from './Notes/Notes';

const NotesModal = ({ isOpen, toggle, notes, restaurant }) => {
    return (
        <Modal className="notes-modal-container" {...{ isOpen, toggle }}>
            <ModalHeader {...{ toggle }}>{ restaurant && restaurant.name }</ModalHeader>
            <ModalBody>
                <Notes {...{ notes }} />
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default NotesModal;
