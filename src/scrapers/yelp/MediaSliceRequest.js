const constants = require('./constants');
const YelpMedia = require('./YelpMedia');

/*
 * MediaSliceRequest
 */
module.exports = class MediaSliceRequest {

	constructor(client) {
		this.client = client;
	}

	send(restaurant, startIndex) {
		// "data-media-url": "/biz_photos/get_media_slice/CMm3Xf-9v3QJ4ge20MoEVg?tab=food",
		const url = formatMediaSliceURL(restaurant.mediaURL, validateStartIndex(startIndex));
		// console.log("url:", url);
		// 'https://www.yelp.com/biz_photos/get_media_slice/CMm3Xf-9v3QJ4ge20MoEVg?tab=food&get_local_ads=1&start=1&dir=f'
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