import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

const LocationRequestErrorModal = ({isOpen, toggle}) => (
    <Modal isOpen={isOpen} toggle={toggle} className="location-request-error-modal">
        <ModalBody>
            <p className="location-request-error-message">We are unable to get your current location.  Please enter your location manually.</p>
        </ModalBody>
        <ModalFooter>
            <Button outline color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
    </Modal>
);

export default LocationRequestErrorModal;