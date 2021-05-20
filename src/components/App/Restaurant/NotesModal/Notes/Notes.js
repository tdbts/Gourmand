import 'react-swipeable-list/dist/styles.css';
import './Notes.css';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type as ListType
} from 'react-swipeable-list';
import {
    Button
} from 'reactstrap';
import Note from './Note/Note';
import EventTracker from "../../../../../tracking/EventTracker";
import constants from '../../../../../constants/constants';

const { events } = constants;
const eventTracker = new EventTracker(constants.EVENT_TRACKING_TOKEN);

const ActionContent = ({ children, color }) => (
    <Button outline className="action-content" {...{ color }}>
        <div className="action-text">
            { children }
        </div>
    </Button>
);

const leadingActions = (removeNote) => (
    <LeadingActions>
        <SwipeAction
            onClick={() => {
                console.info('Deleting note.');
                eventTracker.track(events.DELETE_NOTE);
                removeNote();
            }}
        >
            <ActionContent color="danger">Delete</ActionContent>
        </SwipeAction>
    </LeadingActions>
);

const trailingActions = (makeNoteEditable) => (
    <TrailingActions>
        <SwipeAction
            onClick={() => {
                console.info('Editing Note.');
                eventTracker.track(events.EDIT_NOTE);
                makeNoteEditable();
            }}
        >
            <ActionContent color="warning">Edit</ActionContent>
        </SwipeAction>
    </TrailingActions>
);

const NoNotesMessage = () => (
    <p className="no-notes-message">There are no notes for this restaurant.</p>
);

const Notes = ({ notes, updateNote, removeNote, currentlyEditableNote, setCurrentlyEditableNote, ...props }) => {

    return notes.length
        ? (
            <SwipeableList
                threshold={0.5}
                fullSwipe={true}
                type={ListType.IOS}
            >
                {
                    notes.map((note, i) => (
                        <SwipeableListItem
                            key={(currentlyEditableNote === i) ? i : note}
                            leadingActions={leadingActions(removeNote(i))}
                            trailingActions={trailingActions(() => setCurrentlyEditableNote(i))}
                            listType={ListType.IOS}
                        >
                            <Note
                                text={note}
                                onNoteChange={updateNote(i)}
                                disabled={currentlyEditableNote !== i}
                                disable={() => (currentlyEditableNote === i) && setCurrentlyEditableNote(null)}
                            />
                        </SwipeableListItem>
                    ))
                }
            </SwipeableList>
        )
        : <NoNotesMessage />
};

export default Notes;
