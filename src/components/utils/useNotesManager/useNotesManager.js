import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import EventTracker from "../../../tracking/EventTracker";
import constants from "../../../constants/constants";

const { events } = constants;
const eventTracker = new EventTracker(constants.EVENT_TRACKING_TOKEN);

const useNotesManager = () => {
    const [restaurant, setRestaurant ] = useState(null);
    const [notes, setNotes] = useState([]);
    const [showNotes, setShowNotes] = useState(false);
    const [currentlyEditableNote, setCurrentlyEditableNote] = useState(null);
    const auth = useAuth();

    const getNotes = () => notes;
    const removeEmpty = notes => notes.filter(note => !!note);

    const cleanupNotes = () => {
        const updatedNotes = [].concat(notes);
        setNotes(removeEmpty(updatedNotes));
    };

    const update = (i) => (text) => {
        const updatedNotes = [].concat(notes);
        updatedNotes[i] = text;
        setNotes(updatedNotes);
    };

    const remove = (i) => () => {
        const updatedNotes = [].concat(notes);
        updatedNotes.splice(i, 1);
        setNotes(updatedNotes);
    };

    const add = () => {
        eventTracker.track(events.ADD_NOTE);
        const updatedNotes = [].concat(notes);
        updatedNotes.push("");
        setNotes(updatedNotes);
        setCurrentlyEditableNote(updatedNotes.length - 1);
    };

    const toggle = () => {
        cleanupNotes();

        // If currently exiting notes
        if (showNotes) {
            eventTracker.track(events.CLOSE_NOTES);
            auth.updateNotes(restaurant.id, notes)
                .catch(e => {
                    throw e
                });
        } else {
            eventTracker.track(events.OPEN_NOTES);
        }

        setShowNotes(!showNotes);
    };

    const isEditable = i => i === currentlyEditableNote;

    const retrieveNotes = (restaurantID) => auth.performIfAuthenticated(
        () => auth.getNotes(restaurantID)
                .then(json => {
                    if (json.success) {
                        setNotes(json.notes);
                    } else {
                        console.error(json.message);
                    }
                }));

    return {
        getNotes,
        retrieveNotes,
        update,
        remove,
        add,
        toggle,
        isEditable,
        restaurant,
        setNotes,
        setCurrentlyEditableNote,
        setRestaurant,
        showNotes
    };
};

export default useNotesManager;
