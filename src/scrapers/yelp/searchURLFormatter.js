import constants from "./constants.js";
import pipe from "../../utils/pipe.js";
import url from "url";

function addDescription(description, params) {
    const formatted = description
        ? encodeURIComponent(description)
        : "Restaurants";

    return params.concat(`find_desc=${formatted}`);
}

// Example query: "Brooklyn, NY 11219" or "Brooklyn"
function addLocation(location, params) {
    const formatted = location
        .split(" ")
        .map(piece => encodeURIComponent(piece))
        .join("+");

    return params.concat(`find_loc=${formatted}`);
}

function addDistance(distance, params) {
    if (distance) {
        return params.concat(`l=${encodeURIComponent(distance)}`);
    }

    return params;
}

function addStart(start, params) {
    return params.concat(`start=${start || 0}`);
}

// Encloses URL prefix and returns utility object
const searchURLFormatter = urlPrefix => ({
    location(query, startIndex) {
        return [
            urlPrefix,
            pipe(
                params => addDescription(query.getDescription(), params),
                params => addLocation(query.getLocation(), params),
                params => addDistance(query.getDistance(), params),
                params => addStart(startIndex, params)
            )([]).join("&")
        ].join("?");
    },

    coordinate(query, startIndex) {
        // Example query: "40.625513999999995,-74.0008562,30"
        const ATTRIBUTE = "l=";
        const COUNTRY_CODE = "a:";
        const location = encodeURIComponent(COUNTRY_CODE + query.getText());

        return urlPrefix + location;
    }
});

export default searchURLFormatter;
