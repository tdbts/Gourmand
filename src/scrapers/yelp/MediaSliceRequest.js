import constants from './constants.js';
import YelpMedia from './YelpMedia.js';

/*
 * MediaSliceRequest
 *
 * Makes request to a URL of the following form:
 *   'https://www.yelp.com/biz_photos/get_media_slice/CMm3Xf-9v3QJ4ge20MoEVg?tab=food&get_local_ads=1&start=1&dir=f'
 *
 * These URLs return JSON metadata for a portion of all media files for a particular restaurant.  This class converts this media metadata into 'YelpMedia' instances which are then returned by the caller.
 */
export default class MediaSliceRequest {

	constructor(client) {
		this.client = client;
	}

	send(restaurant, startIndex) {
		const url = formatMediaSliceURL(restaurant.mediaSlicePath, validateStartIndex(startIndex));
		// console.log("url:", url);
		return this.client.get(url)
			.then(response => processMediaSliceResponse(restaurant, startIndex, response));
	}

}

function processMediaSliceResponse(restaurant, startIndex, response) {
	if (response.status < 300) {
		return getMediaFromJSON(response.body);
	}

	console.error(`
		Media slice response: Unable to handle response 
		  Restaurant: ${restaurant.name}
		  StartIndex: ${startIndex}
		  Status: ${response.status}
	`);

	return [];
}

function getMediaFromJSON(json) {
	return json.media.map(json => new YelpMedia(
		json.media_id,
		json.media_type,
		json.media_data.caption,
		json.src
	));
}

function formatMediaSliceURL(mediaSlicePath, startIndex) {
	return constants.url.DOMAIN + mediaSlicePath + `&get_local_ads=1&start=${startIndex}&dir=f`;
}

function validateStartIndex(startIndex) {
	return startIndex || 0;
}