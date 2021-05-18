import './Restaurant.css';
import Gallery from "../common/Gallery/Gallery";
import MapLink from "../common/MapLink/MapLink";
import NotesButton from "./NotesButton/NotesButton";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import withOrderedMedia from "../common/Gallery/withOrderedMedia";

const OrderedGallery = withOrderedMedia(Gallery);

const Restaurant = ({getRestaurantDataByID, isLikedMedia, galleryProps, mediaModalProps}) => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();

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
            <NotesButton />
        </div>
    );
};

export default Restaurant;
