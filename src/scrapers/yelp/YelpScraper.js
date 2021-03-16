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

	// Returns object: { restaurants, geodata }
	resolveQuery(params, geodata) {
		return new SearchRequest(request).send(new SearchQuery(params, geodata));
	}

	retrieveMedia(restaurant) {
		return new MediaRequest(request).send(restaurant);
	}

}
