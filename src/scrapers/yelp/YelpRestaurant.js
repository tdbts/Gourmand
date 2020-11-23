const url = require('url');
const constants = require('./constants');
const Restaurant = require('../../domain/Restaurant');

module.exports = class YelpRestaurant extends Restaurant {

	constructor(id, name, addressLines, neighborhoods, categories, rating, photoPagePath) {
		super(id, name, addressLines, neighborhoods, categories, rating, null, null);
		
		// Get photo page path without attributes and convert to full URL
		this.photoPageURL = getPhotoPageURL(url.parse(photoPagePath).pathname);
	}

	getPhotoPageURL() {
		return this.photoPageURL;
	}

}

function getPhotoPageURL(photoPagePath) {
	return constants.url.DOMAIN + photoPagePath + "?tab=food";
}
