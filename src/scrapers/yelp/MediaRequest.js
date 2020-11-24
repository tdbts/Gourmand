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
 * After metadata has been retrieved, makes requests for media slices.
 */
module.exports = class MediaRequest {

	constructor(client) {
		this.client = client;
	}

	send(restaurant) {
		return retrieveMediaMetadata(this.client, restaurant)
			// TODO: Scrape all slices
			.then(() => new MediaSliceRequest(this.client).send(restaurant, 0));
	}

};

function retrieveMediaMetadata(client, restaurant) {
	if (restaurant.getMediaURL()) {
		return Promise.resolve();
	}

	return makePhotoPageRequest(client, restaurant.getPhotoPageURL())
			.then(response => response.body)
			.then(json => setExtractedProperties(restaurant, json));
}

function setExtractedProperties(restaurant, json) {
	restaurant.setMediaCount(json.lightbox_metadata['data-media-count']);
	restaurant.setMediaURL(json.lightbox_metadata['data-media-url']);
	return json;	
}

function makePhotoPageRequest(client, photoPageURL) {
	console.log("Making request to:", photoPageURL);
	return client
		.get(photoPageURL)
		.set("x-requested-with", "XMLHttpRequest")
		.catch(err => console.error("Error making photo page request:", err));
}
