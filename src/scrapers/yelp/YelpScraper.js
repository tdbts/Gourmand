const constants = require('./constants');
const SearchQuery = require('./SearchQuery');
const SearchRequest = require('./SearchRequest');
const MediaRequest = require('./MediaRequest');

let request;

/*
 * YelpScraper
 */
module.exports = class YelpScraper {

	constructor(client) {

		request = client;
	
	}

	findRestaurants(query) {
		return new SearchRequest(request).send(queryFromText(query));
	}

	retrieveMedia(restaurant) {
		return new MediaRequest(request).send(restaurant);
	}

}

function queryFromText(query) {
	return new SearchQuery(query, parseQueryType(query));
}

function parseQueryType(query) {
	// TODO: Differentiate
	return constants.queryTypes.LOCATION;
}
