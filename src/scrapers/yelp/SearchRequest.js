const constants = require('./constants');
const ListParser = require('./ListParser');

/*
 * SearchRequest
 */
module.exports = class SearchRequest {

	constructor(client) {
		this.client = client;
	}

	send(query) {
		const url = getSearchURL(query);
		console.log("Making search request:", url);
		return this.client.get(url)
			.then(processSearchResponse)
		// .then(response => console.log("response:"
	}

};

function processSearchResponse(response) {
	if (response.status < 300) {
		const json = new ListParser().parse(response.text);
		// console.log("json:", json);
		return json;
	} else {
		console.log("response:", response);
		throw new Error("Location query returned status code:", response.status);
	}
}

function getSearchURL(query) {
	return searchURLFormatter[query.getType()](query);
}

const searchURLFormatter = {
	location(query) {
		const ATTRIBUTE = "find_loc=";
		// Example query: "Brooklyn, NY 11219" or "Brooklyn"
		const location = query.getText()
			.split(" ")
			.map(piece => encodeURIComponent(piece))
			.join("+");

		return constants.url.LOCATION_SEARCH_PREFIX + ATTRIBUTE + location;
	},

	coordinate(query) {
		// Example query: "40.625513999999995,-74.0008562,30"
		const ATTRIBUTE = "l=";
		const COUNTRY_CODE = "a:";
		const location = encodeURIComponent(COUNTRY_CODE + query.getText());

		return constants.url.LOCATION_SEARCH_PREFIX + location;
	}
};
