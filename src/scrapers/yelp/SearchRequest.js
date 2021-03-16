import YelpRestaurant from './YelpRestaurant.js';
import searchURLFormatter from "./searchURLFormatter.js";

/*
 * SearchRequest
 *
 * Makes search request for restaurant list for a particular location.
 */
export default class SearchRequest {

	constructor(client) {
		this.client = client;
	}

	send(query, startIndex) {
		const url = getSearchURL(query, startIndex);
		console.log("Making search request:", url);
		return this.client
			.get(url)
			.then(processSearchResponse)
		// .then(response => console.log("response:"
	}

};

// TODO: Iterate over restaurant pagination
function processSearchResponse(response) {
	if (response.status < 300) {
		return {
			restaurants: restaurantsFromData(getRestaurantDataFromJSON(response.body)),
			geodata: getGeodataFromJSON(response.body)
		};
	} else {
		console.log("response:", response);
		throw new Error("Location query returned status code:", response.status);
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
		json.name,
		json.addressLines,
		json.neighborhoods,
		json.categories.map(categoryObj => categoryObj.title),
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

function getSearchURL(query, startIndex) {
	return searchURLFormatter[query.getType()](query, startIndex);
}
