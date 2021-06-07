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
import EventTrackerFactory from "../../../../../tracking/EventTrackerFactory.js";

const { events } = constants;
const eventTracker = EventTrackerFactory.getTracker(EventTrackerFactory.types.BROWSER, window.location.hostname);

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

const Notes = ({ notesManager, ...props }) => {

    return notesManager.getNotes().length
        ? (
            <SwipeableList
                threshold={0.5}
                fullSwipe={true}
                type={ListType.IOS}
            >
                {
                    notesManager.getNotes().map((note, i) => (
                        <SwipeableListItem
                            key={notesManager.isEditable(i) ? i : note}
                            leadingActions={leadingActions(notesManager.remove(i))}
                            trailingActions={trailingActions(() => notesManager.setCurrentlyEditableNote(i))}
                            listType={ListType.IOS}
                        >
                            <Note
                                text={note}
                                onNoteChange={notesManager.update(i)}
                                disabled={!notesManager.isEditable(i)}
                                disable={() => notesManager.isEditable(i) && notesManager.setCurrentlyEditableNote(null)}
                            />
                        </SwipeableListItem>
                    ))
                }
            </SwipeableList>
        )
        : <NoNotesMessage />
};

export default Notes;
