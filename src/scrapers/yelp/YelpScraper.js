import constants from './constants.js';
import SearchQuery from './SearchQuery.js';
import SearchRequest from './SearchRequest.js';
import MediaRequest from './MediaRequest.js';

let request;

/*
 * YelpScraper
 */
export default class YelpScraper {

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
