import './Restaurant.css';
import Gallery from "../common/Gallery/Gallery";
import MapLink from "../common/MapLink/MapLink";
import NotesButton from "./NotesButton/NotesButton";
import NotesModal from "./NotesModal/NotesModal";
import {useEffect, useState} from "react";
import {Redirect, useLocation} from 'react-router-dom';
import withOrderedMedia from "../common/Gallery/withOrderedMedia";
import {useAuth} from "../../utils/auth/useAuth";
import useNotesManager from "../../utils/useNotesManager/useNotesManager";

const OrderedGallery = withOrderedMedia(Gallery);

const getMediaOrder = (unorderedMedia, isLikedMedia) => {
    const separatedByLiked = unorderedMedia.reduce((lists, media) => {
        const listIndex = isLikedMedia(media.id) ? 0 : 1;
        lists[listIndex] = lists[listIndex].concat(media.id);
        return lists;
    }, [[], []]);

    return separatedByLiked[0].concat(separatedByLiked[1]);
}

/*
* Restaurant currently used in restaurant pages, search results list, and now profile pages
* */
const Restaurant = ({ id, getRestaurantDataByID, isLikedMedia, galleryProps }) => {
    // Restaurant data may not be available initially, such as when the user lands on restaurant page
    // and the restaurant data must be retrieved from the lookup or remote DB
    const [restaurant, setRestaurant] = useState(null);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const auth = useAuth();
    const location = useLocation();
    const notesManager = useNotesManager();

    useEffect(() => {
        if (id) {
            getRestaurantDataByID(id)
                .then(restaurant => {
                    if (restaurant) {
                        setRestaurant(restaurant);
                    }
                })
                .catch(e => {
                    throw e;
                });
        }
    }, [id]);

    useEffect(() => {
        if (restaurant && !notesManager.restaurant) {
            notesManager.setRestaurant(restaurant);
        }
    }, [restaurant]);

    useEffect(() => {
        if (restaurant) {
            notesManager.retrieveNotes(restaurant.id)
                .catch(e => {
                    if (!auth.isAuthenticated()) {
                        setRedirectToLogin(true);
                    } else {
                        console.error(e);
                    }
                });
        }
    }, [restaurant]);

    const toggleNotesIfAuthenticated = () => {
        if (auth.isAuthenticated()) {
            notesManager.toggle();
        } else {
            setRedirectToLogin(true);
        }
    };

    if (redirectToLogin) {
        return <Redirect to={{
            pathname: '/user/login',
            state: { from: location.pathname }
        }} />;
    }

    if (!restaurant)
        return null;

    const { name, address, neighborhoods, media } = restaurant;
    const mediaOrder = getMediaOrder(media, isLikedMedia);

    return (
        <div className="restaurant-container">
            <div className="restaurant-details-container">
                <div className="text-container">
                    <h2 className="restaurant-name">{name}</h2>
                    <p><MapLink className="restaurant-address" address={address} /></p>
                    {(neighborhoods.length > 0) && <p className="restaurant-neighborhoods">{neighborhoods.join(", ")}</p>}
                </div>
            </div>
            <div className="restaurant-media-container">
                <OrderedGallery {...galleryProps} restaurants={[restaurant]} mediaOrder={mediaOrder} showLiked={false} transitionTimeout={50} />
                <div className="notes-button-container">
                    <div className="notes-button-boundary">
                        <NotesButton onClick={toggleNotesIfAuthenticated} />
                    </div>
                </div>
            </div>
            <NotesModal isOpen={notesManager.showNotes} toggle={toggleNotesIfAuthenticated} {...{ restaurant, notesManager }} />
        </div>
    );
};

export default Restaurant;
