import './Note.css';
import {
    Container,
    Row,
    Column
} from 'reactstrap';

const Note = ({ text }) => (
    <Container className="note-container">
        <div className="note-text">
            { text }
        </div>
    </Container>
);

export default Note;
