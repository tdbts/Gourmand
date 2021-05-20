import './Restaurant.css';
import Gallery from "../common/Gallery/Gallery";
import MapLink from "../common/MapLink/MapLink";
import NotesButton from "./NotesButton/NotesButton";
import NotesModal from "./NotesModal/NotesModal";
import { useState, useEffect } from "react";
import {Redirect, useHistory, useLocation, useParams} from 'react-router-dom';
import withOrderedMedia from "../common/Gallery/withOrderedMedia";
import {useAuth} from "../../utils/auth/useAuth";
import EventTracker from "../../../tracking/EventTracker";
import constants from '../../../constants/constants';

const { events } = constants;
const eventTracker = new EventTracker(constants.EVENT_TRACKING_TOKEN);

const OrderedGallery = withOrderedMedia(Gallery);

const Restaurant = ({getRestaurantDataByID, isLikedMedia, galleryProps, mediaModalProps}) => {
    const [restaurant, setRestaurant] = useState(null);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [ currentlyEditableNote, setCurrentlyEditableNote ] = useState(null);
    const [ redirectToLogin, setRedirectToLogin ] = useState(false);
    const { id } = useParams();
    const auth = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (restaurant) {
            auth.authenticate()
                .then(() => {
                    if (auth.isAuthenticated()) {
                        auth.getNotes(restaurant.id)
                            .then(json => {
                                if (json.success) {
                                    setNotes(json.notes);
                                } else {
                                    console.error(json.message);
                                }
                            })
                            .catch(e => {
                                throw e
                            });
                    }
                })
                .catch(e => {
                    throw e;
                });
        }
    }, [restaurant]);

    const toggleNotes = () => {
        cleanupNotes();

        // If currently exiting notes
        if (showNotesModal) {
            eventTracker.track(events.CLOSE_NOTES);
            auth.updateNotes(restaurant.id, notes)
                .catch(e => {
                    throw e
                });
        } else {
            eventTracker.track(events.OPEN_NOTES);
        }

        setShowNotesModal(!showNotesModal);
    };

    const toggleNotesIfAuthenticated = () => {
        if (auth.isAuthenticated()) {
            toggleNotes();
        } else {
            setRedirectToLogin(true);
        }
    };

    const removeEmpty = notes => notes.filter(note => !!note);

    const cleanupNotes = () => {
        const updatedNotes = [].concat(notes);
        setNotes(removeEmpty(updatedNotes));
    };

    const updateNote = (i) => (text) => {
        const updatedNotes = [].concat(notes);
        updatedNotes[i] = text;
        setNotes(updatedNotes);
    };

    const removeNote = (i) => () => {
        const updatedNotes = [].concat(notes);
        updatedNotes.splice(i, 1);
        setNotes(updatedNotes);
    };

    const addNote = () => {
        eventTracker.track(events.ADD_NOTE);
        const updatedNotes = [].concat(notes);
        updatedNotes.push("");
        setNotes(updatedNotes);
        setCurrentlyEditableNote(updatedNotes.length - 1);
    };

    useEffect(() => {
        if (id) {
            getRestaurantDataByID(id)
                .then(restaurant => {
                    if (restaurant) {
                        setRestaurant(restaurant);
                    }
                })
        }
    }, [id]);

    if (redirectToLogin) {
        return <Redirect to={{
            pathname: '/user/login',
            state: { from: location.pathname }
        }} />;
    }

    if (!restaurant)
        return null;

    const { name, address, neighborhoods, media } = restaurant;
    const separatedByLiked = media.reduce((lists, media, i) => {
        const listIndex = isLikedMedia(media.id) ? 0 : 1;
        lists[listIndex] = lists[listIndex].concat(media.id);
        return lists;
    }, [[], []]);
    const mediaOrder = separatedByLiked[0].concat(separatedByLiked[1]);

    return (
        <div className="restaurant-container">
            <div className="restaurant-details-container text-container">
                <h2 className="restaurant-name">{name}</h2>
                <p><MapLink className="restaurant-address" address={address} /></p>
                {(neighborhoods.length > 0) && <p className="restaurant-neighborhoods">{neighborhoods.join(", ")}</p>}
            </div>
            <div className="restaurant-media-container">
                <OrderedGallery {...galleryProps} mediaModalProps={mediaModalProps} restaurants={[restaurant]} mediaOrder={mediaOrder} showLiked={false} transitionTimeout={50} />
            </div>
            <NotesButton onClick={toggleNotesIfAuthenticated} />
            <NotesModal isOpen={showNotesModal} toggle={toggleNotesIfAuthenticated} {...{ notes, restaurant, updateNote, removeNote, currentlyEditableNote, setCurrentlyEditableNote, addNote }} />
        </div>
    );
};

export default Restaurant;
