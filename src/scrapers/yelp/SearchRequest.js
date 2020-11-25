const constants = require('./constants');
const YelpRestaurant = require('./YelpRestaurant');

/*
 * SearchRequest
 *
 * Makes search request for restaurant list for a particular location.
 */
module.exports = class SearchRequest {

	constructor(client) {
		this.client = client;
	}

	send(query, startIndex) {
		const url = getSearchURL(query, startIndex);
		console.log("Making search request:", url);
		return this.client.get(url)
			.then(processSearchResponse)
		// .then(response => console.log("response:"
	}

};

function processSearchResponse(response) {
	if (response.status < 300) {
		const restaurantsData = getRestaurantDataFromJSON(response.body);
		// console.log("restaurantsData:", restaurantsData);
		return restaurantsFromData(restaurantsData);
	} else {
		console.log("response:", response);
		throw new Error("Location query returned status code:", response.status);
	}
}

function getRestaurantDataFromJSON(json) {
	return json.searchPageProps.searchMapProps.hovercardData;
}

function restaurantsFromData(restaurantsData) {
	return Object.keys(restaurantsData)
		.map(id => {
			const json = restaurantsData[id];
			// console.log("json:", json);
			
			return new YelpRestaurant(
				id, 
				json.name, 
				json.addressLines, 
				json.neighborhoods,
				json.categories.map(categoryObj => categoryObj.title),
				json.rating,
				json.photoPageUrl)
		});
}

function getSearchURL(query, startIndex) {
	return searchURLFormatter[query.getType()](query, startIndex);
}

const searchURLFormatter = {
	location(query, startIndex) {
		const LOCATION_ATTRIBUTE = "find_loc=";
		// Example query: "Brooklyn, NY 11219" or "Brooklyn"
		const location = query.getText()
			.split(" ")
			.map(piece => encodeURIComponent(piece))
			.join("+");

		const START_ATTRIBUTE = "&start=";

		return constants.url.LOCATION_SEARCH_PREFIX + LOCATION_ATTRIBUTE + location + START_ATTRIBUTE + (startIndex || 0);
	},

	// TODO: Use snippet
	coordinate(query, startIndex) {
		// Example query: "40.625513999999995,-74.0008562,30"
		const ATTRIBUTE = "l=";
		const COUNTRY_CODE = "a:";
		const location = encodeURIComponent(COUNTRY_CODE + query.getText());

		return constants.url.LOCATION_SEARCH_PREFIX + location;
	}
};
