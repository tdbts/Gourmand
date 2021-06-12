import searchURLFormatter from "./searchURLFormatter.js";
import SearchResponseJSON from "./SearchResponseJSON.js";
import SearchResponseHTML from "./SearchResponseHTML.js";
import constants from "./constants.js";

const { errorMessages } = constants;

/*
 * SearchRequest
 *
 * Makes search request for restaurant list for a particular location.
 *
 * First attempts to retrieve restaurant list via '/search/snippets' endpoint.
 *
 * If the first attempt to endpoint gets blocked, then attempts to retrieve restaurant list by making a request to the
 * '/query' endpoint and parsing the returned HTML.
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
			.catch(e => {
				if (e.message === errorMessages.BLOCKED_REQUEST) {
					console.warn("Search snippet request blocked.  Attempting to call and parse search HTML.");
					return this.client
						.get(getSearchHTMLURL(query, startIndex))
						.then(processFallbackSearchResponseHTML);
				} else {
					console.log("Error on search request:", e);
				}

				throw e;
			});
	}

};

// TODO: Iterate over restaurant pagination
function processSearchResponse(response) {
	if (response.status < 300) {
		return new SearchResponseJSON(response.body).parse();
	} else if (response.status >= 500) {
		throw new Error(errorMessages.BLOCKED_REQUEST);
	} else {
		console.log("response:", response);
		throw new Error("Location query returned status code:" + response.status);
	}
}

function processFallbackSearchResponseHTML(response) {
	if (response.status < 300) {
		return new SearchResponseJSON(new SearchResponseHTML(response.text).parse()).parse();
	} else {
		throw new Error("Fallback search attempt using HTML failed.");
	}
}

// Example: https://www.yelp.com/search/snippet?find_desc=Pizza&find_loc=Brooklyn%2C+NY&start=0
function getSearchURL(query, startIndex) {
	const formatter = searchURLFormatter(constants.url.LOCATION_SEARCH_SNIPPET_PREFIX);
	return formatter[query.getType()](query, startIndex);
}

// Example: "https://www.yelp.com/search?find_desc=Restaurants&find_loc=Brooklyn%2C+NY+11219&ns=1"
function getSearchHTMLURL(query, startIndex) {
	const formatter = searchURLFormatter(constants.url.LOCATION_SEARCH_PREFIX);
	return formatter[query.getType()](query, startIndex);
}
