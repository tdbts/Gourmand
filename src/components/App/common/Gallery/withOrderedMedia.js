import YelpMedia from "../../../../scrapers/yelp/YelpMedia";

const withOrderedMedia = (Gallery) => ({ restaurants, mediaOrder, ...props }) => {
    const media = getOrderedMedia(restaurants, mediaOrder);
    return <Gallery media={media} {...props} />;
};

function getOrderedMedia(restaurants, mediaOrder) {
    if (!restaurants.length)
        return restaurants;

    const mediaByID = restaurants
        .flatMap(restaurant => restaurant.media)
        .reduce((map, media) => {
            map[media.id] = media;
            return map;
        }, {})

    return mediaOrder
        .map(id => mediaByID[id])
        .map(media => (YelpMedia.populateFromBSON(media)));
}

export default withOrderedMedia;
