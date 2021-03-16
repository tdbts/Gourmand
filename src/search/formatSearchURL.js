import constants from '../scrapers/yelp/constants';
import pipe from '../utils/pipe';

const { distances } = constants;

const formatSearchURL = (url, {description, location, distance}) => {
    return [
        url,
        pipe(
            params => addDescription(description, params),
            params => addLocation(location, params),
            params => addDistance(distance, params)
        )([]).join("&")
    ].join("?");
};

function addDescription(description, params) {
    return params.concat(`description=${encodeURIComponent(description)}`);
}

function addLocation(location, params) {
    return params.concat(`location=${encodeURIComponent(location)}`);
}

function addDistance(distance, params) {
    return (distance && (distance !== distances.UNKNOWN))
        ? params.concat(`distance=${encodeURIComponent(distance)}`)
        : params;
}

export default formatSearchURL;
