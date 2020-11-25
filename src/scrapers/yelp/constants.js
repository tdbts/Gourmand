const DOMAIN = "https://www.yelp.com";
const LOCATION_SEARCH_PREFIX = DOMAIN + "/search/snippet?find_desc=Restaurants&";

const queryTypes = {
	LOCATION: 'location',
	COORDINATE: 'coordinate'
};

const url = {
	DOMAIN,
	LOCATION_SEARCH_PREFIX
}

module.exports = {
	queryTypes,
	url
};
