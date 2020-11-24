const constants = require('./constants');
const YelpMedia = require('./YelpMedia');

/*
 * MediaSliceRequest
 *
 * Makes request to a URL of the following form:
 *   'https://www.yelp.com/biz_photos/get_media_slice/CMm3Xf-9v3QJ4ge20MoEVg?tab=food&get_local_ads=1&start=1&dir=f'
 *
 * These URLs return JSON metadata for a portion of all media files for a particular restaurant.  This class converts this media metadata into 'YelpMedia' instances which are then returned by the caller.
 */
module.exports = class MediaSliceRequest {

	constructor(client) {
		this.client = client;
	}

	send(restaurant, startIndex) {
		const url = formatMediaSliceURL(restaurant.mediaURL, validateStartIndex(startIndex));
		// console.log("url:", url);
		return makeMediaSliceRequest(this.client, url)
			.then(response => response.body)
			.then(getMediaFromJSON);
	}

}

function getMediaFromJSON(json) {
	return json.media.map(json => new YelpMedia(
		json.media_id,
		json.media_type,
		json.media_data.caption,
		json.src
	));
}

function makeMediaSliceRequest(client, url) {
	return client
		.get(url)
		.set("x-requested-with", "XMLHttpRequest");
}

function formatMediaSliceURL(mediaURL, startIndex) {
	return constants.url.DOMAIN + mediaURL + `&get_local_ads=1&start=${startIndex}&dir=f`;
}

function validateStartIndex(startIndex) {
	return startIndex || 0;
}