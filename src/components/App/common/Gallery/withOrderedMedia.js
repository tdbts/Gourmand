import { useState, useEffect } from 'react';
import YelpMedia from "../../../../scrapers/yelp/YelpMedia";

const withOrderedMedia = (Gallery) => ({ restaurants, mediaOrder, ...props }) => {
    const [orderedMedia, setOrderedMedia] = useState([]);

    useEffect(() => {
        setOrderedMedia(getOrderedMedia(restaurants, mediaOrder));
    }, [restaurants]);

    return <Gallery media={orderedMedia} {...props} />;
};

function getOrderedMedia(restaurants, mediaOrder) {
    if (!restaurants.length)
        return restaurants;

    const mediaByID = restaurants
        .flatMap(restaurant => restaurant.media)
        .reduce((map, media) => {
            map[media.id] = media;
            return map;
        }, {});

    // TODO: Iteration over a large number of media can cause significant performance degradation
    return mediaOrder
        .map(id => mediaByID[id])
        .map(media => (YelpMedia.populateFromBSON(media)));
}

export default withOrderedMedia;
