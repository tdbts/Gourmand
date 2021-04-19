import {useEffect, useState} from "react";
import _ from "underscore";
import YelpMedia from "../../../../scrapers/yelp/YelpMedia";

const withShuffledMedia = (Gallery) => ({ restaurants, ...props }) => {
    // const [canShuffleMedia, setCanShuffleMedia] = useState(true);
    const [shuffledMedia, setShuffledMedia] = useState([]);
    // const onEntered = () => {
    //     setCanShuffleMedia(false);
    // };
    // const onExited = () => {
    //     setCanShuffleMedia(true);
    // };
    useEffect(() => {
        // if (canShuffleMedia) {
        //     setShuffledMedia(getShuffledMedia(restaurants));
        // }
        setShuffledMedia(getShuffledMedia(restaurants));
    }, [restaurants]);

    return <Gallery media={shuffledMedia} {...props} />;
};

function getShuffledMedia(restaurants) {
    console.log("restaurants:", restaurants);
    const allMedia = restaurants.flatMap(restaurant => restaurant.media);
    console.log("allMedia:", allMedia);
    const shuffledMedia = _.shuffle(allMedia);
    // console.log("shuffledMedia:", shuffledMedia);
    return shuffledMedia.map(media => (YelpMedia.populateFromBSON(media)));
}

export default withShuffledMedia;
