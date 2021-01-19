import constants from './constants.js';
import YelpRestaurant from './YelpRestaurant.js';

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
			.set('Referer', "http://localhost:3000")
			.set('User-Agent', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36")
			.then(processSearchResponse)
		// .then(response => console.log("response:"
	}

};

// TODO: Iterate over restaurant pagination
function processSearchResponse(response) {
	console.log("Search: response.status:", response.status);
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
		const description = query.getDescription()
			? encodeURIComponent(query.getDescription())
			: "Restaurants"; 
		// Example query: "Brooklyn, NY 11219" or "Brooklyn"
		const location = query.getLocation()
			.split(" ")
			.map(piece => encodeURIComponent(piece))
			.join("+");

		const start = startIndex || 0;

		return constants.url.LOCATION_SEARCH_PREFIX  + `?find_desc=${description}`  + `&find_loc=${location}` + `&start=${start}`;
	},

	coordinate(query, startIndex) {
		// Example query: "40.625513999999995,-74.0008562,30"
		const ATTRIBUTE = "l=";
		const COUNTRY_CODE = "a:";
		const location = encodeURIComponent(COUNTRY_CODE + query.getText());

		return constants.url.LOCATION_SEARCH_PREFIX + location;
	}
};
