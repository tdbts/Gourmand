import url from 'url';
import constants from './constants.js';
import Restaurant from '../../domain/Restaurant.js';

export default class YelpRestaurant extends Restaurant {

	constructor(id, name, addressLines, neighborhoods, categories, rating, photoPagePath) {
		super(id, name, addressLines, neighborhoods, categories, rating, null, null);

		// Get photo page path without attributes and convert to full URL
		this.photoPageURL = getPhotoPageURL(url.parse(photoPagePath).pathname);
		this.mediaURL = null;
	}

	getPhotoPageURL() {
		return this.photoPageURL;
	}

	getMediaURL() {
		return this.mediaURL;
	}

	setMediaURL(url) {
		this.mediaURL = url;

		if (this.mediaURL.slice(-9) !== '?tab=food')
			this.mediaURL += '?tab=food';
	}

}

function getPhotoPageURL(photoPagePath) {
	return constants.url.DOMAIN + photoPagePath + "?tab=food";
}
