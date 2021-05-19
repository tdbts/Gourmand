import './Restaurant.css';
import Gallery from "../common/Gallery/Gallery";
import MapLink from "../common/MapLink/MapLink";
import NotesButton from "./NotesButton/NotesButton";
import NotesModal from "./NotesModal/NotesModal";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import withOrderedMedia from "../common/Gallery/withOrderedMedia";

const OrderedGallery = withOrderedMedia(Gallery);

const Restaurant = ({getRestaurantDataByID, isLikedMedia, galleryProps, mediaModalProps}) => {
    const [restaurant, setRestaurant] = useState(null);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [notes, setNotes] = useState([]);
    const [ currentlyEditableNote, setCurrentlyEditableNote ] = useState(null);
    const { id } = useParams();
    const toggleNotes = () => {
        cleanupNotes();
        console.log(`Setting notes modal to ${!showNotesModal}`);
        setShowNotesModal(!showNotesModal);
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
            <NotesButton onClick={toggleNotes} />
            <NotesModal isOpen={showNotesModal} toggle={toggleNotes} {...{ notes, restaurant, updateNote, removeNote, currentlyEditableNote, setCurrentlyEditableNote, addNote }} />
        </div>
    );
};

export default Restaurant;
