import constants from './constants.js';
import Restaurant from '../../domain/Restaurant.js';

const { DOMAIN } = constants.url;

export default class YelpRestaurant extends Restaurant {

	constructor(id, name, addressLines, neighborhoods, categories, rating, photoPagePath, mediaCount, media) {
		super(id, name, addressLines, neighborhoods, categories, rating, mediaCount, media);

		// URL for obtaining metadata that points client to path for obtaining media slices
		this.photoPageURL = getPhotoPageURL(photoPagePath);
		// Path for obtaining media slices
		this.mediaSlicePath = null;
	}

	static populateFromBSON(bson, mediaPopulator) {
		const {
			id, name, address, neighborhoods,
			categories, rating, photoPageURL, mediaCount, media
		} = bson;

		return new YelpRestaurant(
			id,
			name,
			address,
			neighborhoods,
			categories,
			rating,
			photoPageURL,
			mediaCount,
			media ? media.map(mediaPopulator) : []
		);
	}

	getPhotoPageURL() {
		return this.photoPageURL;
	}

	getMediaSlicePath() {
		return this.mediaSlicePath;
	}

	setMediaSlicePath(url) {
		this.mediaSlicePath = url;

		if (this.mediaSlicePath.slice(-9) !== '?tab=food')
			this.mediaSlicePath += '?tab=food';
	}

}

// Get photo page path without attributes and convert to full URL
function getPhotoPageURL(photoPagePath) {
	return DOMAIN + pathWithoutAttributes(photoPagePath) + "?tab=food";
}

function pathWithoutAttributes(photoPagePath) {
	return new URL(photoPagePath, DOMAIN).pathname;
}
