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

	findRestaurants(location, description) {
		return new SearchRequest(request).send(queryFromText(location, description));
	}

	retrieveMedia(restaurant) {
		return new MediaRequest(request).send(restaurant);
	}

}

function queryFromText(location, description) {
	return new SearchQuery(location, parseLocationType(location), description);
}

function parseLocationType(location) {
	// TODO: Differentiate
	return constants.queryTypes.LOCATION;
}
