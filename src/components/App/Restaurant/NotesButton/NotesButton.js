import './NotesButton.css';
import {
    Button
} from 'reactstrap';
import NotesIcon from './NotesIcon';

const NotesButton = ({}) => (
    <Button className="notes-button">
        <div className="square-container">
            <NotesIcon />
        </div>
    </Button>
);

export default NotesButton;
