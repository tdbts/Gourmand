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
    Container,
    Button
} from 'reactstrap';
import Note from './Note/Note';

const ActionContent = ({ children, color }) => (
    <Button outline className="action-content" {...{ color }}>
        <div className="action-text">
            { children }
        </div>
    </Button>
);

const leadingActions = () => (
    <LeadingActions>
        <SwipeAction
            destructive={true}
            onClick={() => console.info('Deleting note.')}
        >
            <ActionContent color="danger">Delete</ActionContent>
        </SwipeAction>
    </LeadingActions>
);

const trailingActions = () => (
    <TrailingActions>
        <SwipeAction
            onClick={() => console.info('Editing Note.')}
        >
            <ActionContent color="warning">Edit</ActionContent>
        </SwipeAction>
    </TrailingActions>
);

const NoNotesMessage = () => (
    <p className="no-notes-message">There are no notes for this restaurant.</p>
);

const Notes = ({ notes }) => {
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
                            key={i}
                            leadingActions={leadingActions()}
                            trailingActions={trailingActions()}
                            listType={ListType.IOS}
                        >
                            <Note text={note} />
                        </SwipeableListItem>
                    ))
                }
            </SwipeableList>
        )
        : <NoNotesMessage />
};

export default Notes;
