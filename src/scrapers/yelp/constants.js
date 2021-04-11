const DOMAIN = "https://www.yelp.com";
const LOCATION_SEARCH_PREFIX = DOMAIN + "/search";
const LOCATION_SEARCH_SNIPPET_PREFIX = LOCATION_SEARCH_PREFIX + "/snippet";

const queryTypes = {
	LOCATION: 'location',
	COORDINATE: 'coordinate'
};

const distances = {
	UNKNOWN: 'unknown',
	BIRDS_EYE: 0,
	DRIVING: 1,
	BIKING: 2,
	WALKING: 3,
	BLOCKS: 4
};

const url = {
	DOMAIN,
	LOCATION_SEARCH_PREFIX,
	LOCATION_SEARCH_SNIPPET_PREFIX
};

export default {
	queryTypes,
	distances,
	url
};
