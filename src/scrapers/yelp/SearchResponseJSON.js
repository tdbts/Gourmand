import YelpRestaurant from "./YelpRestaurant.js";
import unescapeHTMLEntities from "../../utils/unescapeHTMLEntities.js";

class SearchResponseJSON {

    constructor(json) {
        this.json = json;
    }

    parse() {
        return {
            restaurants: restaurantsFromData(getRestaurantDataFromJSON(this.json)),
            geodata: getGeodataFromJSON(this.json)
        };
    }

}

function getRestaurantDataFromJSON(json) {
    try {
        return json.searchPageProps.searchMapProps.hovercardData;
    } catch (e) {
        console.log("Cannot get restaurant data from unexpected JSON format.");
        throw e;
    }
}

function restaurantsFromData(restaurantsData) {
    return Object.keys(restaurantsData)
        .filter(id => !restaurantsData[id].isAd)  // Remove ads
        .map(id => restaurantFromData(id, restaurantsData[id]));
}

function restaurantFromData(id, json) {
    return new YelpRestaurant(
        id,
        unescapeHTMLEntities(json.name),
        json.addressLines,
        json.neighborhoods,
        json.categories.map(categoryObj => categoryObj.title).map(unescapeHTMLEntities),
        json.rating,
        json.photoPageUrl);
}

function getGeodataFromJSON(json) {
    try {
        return json.searchPageProps.filterPanelProps.filterSetMap.distance.filters;
    } catch (e) {
        console.log("Cannot get geodata from unexpected JSON format.");
        throw e;
    }
}

export default SearchResponseJSON;
