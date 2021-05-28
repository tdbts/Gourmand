import {useEffect, useState} from "react";
import _ from "underscore";
import ss from 'seededshuffle';
import YelpMedia from "../../../../scrapers/yelp/YelpMedia";

const withShuffledMedia = (Gallery) => ({ restaurants, ...props }) => {
    const [shuffledMedia, setShuffledMedia] = useState([]);

    useEffect(() => {
        setShuffledMedia(getShuffledMedia(restaurants));
    }, [restaurants]);

    return <Gallery media={shuffledMedia} {...props} />;
};

function getShuffledMedia(restaurants) {
    console.log("restaurants:", restaurants);
    const allMedia = restaurants.flatMap(restaurant => restaurant.media);
    const copyArray = true;
    console.log("allMedia:", allMedia);
    const seed = restaurants.length ? restaurants[0].id : "empty";
    const shuffledMedia = ss.shuffle(allMedia, seed, copyArray);
    // console.log("shuffledMedia:", shuffledMedia);
    return shuffledMedia.map(media => (YelpMedia.populateFromBSON(media)));
}

export default withShuffledMedia;
