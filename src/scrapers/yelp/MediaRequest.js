import constants from './constants.js';
import MediaSliceRequest from './MediaSliceRequest.js';
import MediaPageRequest from "./MediaPageRequest.js";

const { errorMessages } = constants;
/*
 * MediaRequest
 *
 * If given restaurant does not have media metadata, client retrieves this information by making a request to a URL of
 * the following form:
 *   'https://www.yelp.com/biz_photos/pho-60-brooklyn-8?tab=food'
 *   
 * URL returns JSON with media count and media URL data.
 *
 * After metadata has been retrieved, makes requests for media slices.
 *
 * If media slice request is blocked, attempts to retrieve media information by parsing HTML included in photo page URL response JSON.
 */
export default class MediaRequest {
	static EMPTY_LIST = [];

	constructor(client) {
		this.client = client;
	}

	// Returns array of image URLs
	send(restaurant) {
		return retrieveMediaMetadata(this.client, restaurant)
			// Nothing we can do if we can't retrieve media metadata, but don't throw exception as requests for other restaurants could theoretically still work
			.catch(e => {
				console.error(e);
				return MediaRequest.EMPTY_LIST;
			})
			// If metadata retrieval successful and media URL present, make request
			.then(() => restaurant.getMediaSlicePath()
				? retrieveRestaurantMedia(this.client, restaurant)
				: MediaRequest.EMPTY_LIST)
			.catch(e => {
				console.error(e.message);
				return MediaRequest.EMPTY_LIST;
			})
	}

};

// TODO: Scrape all slices
function retrieveRestaurantMedia(client, restaurant) {
	return new MediaSliceRequest(client).send(restaurant, 0)
		.catch(e => {
			if (e.message === errorMessages.BLOCKED_REQUEST) {
				console.warn("Media slice request blocked.  Attempting to call and parse media page HTML.");
				return new MediaPageRequest(client).send(restaurant, 0);
			}

			throw e;
		});
}

function retrieveMediaMetadata(client, restaurant) {
	if (restaurant.getMediaSlicePath()) {
		return Promise.resolve();
	}

	return makePhotoPageRequest(client, restaurant.getPhotoPageURL())
			.then(response => processMetadataResponse(restaurant, response));
}

function makePhotoPageRequest(client, photoPageURL) {
	console.log("Making request to:", photoPageURL);
	return client
		.get(photoPageURL)
		.catch(e => {
			console.error(`Error making photo page request to ${photoPageURL}:`, e.message || e.status || (e.response && e.response.body));
			return e;
		});
}

function processMetadataResponse(restaurant, response) {
	if (response.status === 404) {
		restaurant.setMediaCount(0);
	} else if (response.status < 300) {
		setExtractedMetadata(restaurant, response.body);
	} else {
		console.error(`
			Photo metadata response: Unable to handle response 
			  Restaurant: ${restaurant.name}
			  Status: ${response.status}
		`);

		throw new Error(errorMessages.MEDIA_METADATA_REQUEST_FAILURE);
	}
}

function setExtractedMetadata(restaurant, json) {
	restaurant.setMediaCount(json.lightbox_metadata['data-media-count']);
	restaurant.setMediaSlicePath(json.lightbox_metadata['data-media-url']);
}
