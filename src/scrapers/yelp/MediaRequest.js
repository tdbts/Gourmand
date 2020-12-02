const cheerio = require('cheerio');
const url = require('url');
const constants = require('./constants');
const MediaSliceRequest = require('./MediaSliceRequest');

/*
 * MediaRequest
 *
 * If given restaurant does not have media metadata, makes request to URL of the following form:
 *   'https://www.yelp.com/biz_photos/pho-60-brooklyn-8?tab=food'
 *   
 * URL returns JSON with media count and media URL data.
 *
 * After metadata has been retrieved, makes requests for media slices.
 */
module.exports = class MediaRequest {

	constructor(client) {
		this.client = client;
	}

	// Returns array of image URLs
	send(restaurant) {
		return retrieveMediaMetadata(this.client, restaurant)
			// If metadata retrieval successful and media URL present, make request
			.then(() => restaurant.getMediaURL()
				// TODO: Scrape all slices
				? new MediaSliceRequest(this.client).send(restaurant, 0)
				: []);
	}

};

function retrieveMediaMetadata(client, restaurant) {
	if (restaurant.getMediaURL()) {
		return Promise.resolve();
	}

	return makePhotoPageRequest(client, restaurant.getPhotoPageURL())
			.then(response => processMetadataResponse(restaurant, response));
}

function processMetadataResponse(restaurant, response) {
	if (response.status === 404) {
		restaurant.setMediaCount(0);
	} else if (response.status < 300) {
		setExtractedProperties(restaurant, response.body);
	} else {
		console.error(`
			Photo metadata response: Unable to handle response 
			  Restaurant: ${restaurant.name}
			  Status: ${response.status}
		`);
	}
}

function setExtractedProperties(restaurant, json) {
	restaurant.setMediaCount(json.lightbox_metadata['data-media-count']);
	restaurant.setMediaURL(json.lightbox_metadata['data-media-url']);	
}

function makePhotoPageRequest(client, photoPageURL) {
	console.log("Making request to:", photoPageURL);
	return client
		.get(photoPageURL)
		.set("x-requested-with", "XMLHttpRequest")
		.catch(e => {
			console.error(`Error making photo page request to ${photoPageURL}:`, e.message || e.status || (e.response && e.response.body));
			return e;
		});
}
