const cheerio = require('cheerio');
const url = require('url');
const constants = require('./constants');

/*
 * MediaRequest
 */
module.exports = class MediaRequest {

	constructor(client) {
		this.client = client;
	}

	send(restaurant) {
		return makePhotoPageRequest(this.client, restaurant.getPhotoPageURL())
			.then(response => response.body)
			.then(json => {
				restaurant.mediaCount = json['data-media-count'];
				return json;
			})
			.then(getThumbnailImages);
	}

}

function makePhotoPageRequest(client, photoPageURL) {
	console.log("Making request to:", photoPageURL);
	return client
		.get(photoPageURL)
		.set("x-requested-with", "XMLHttpRequest")
		.catch(err => console.error("Error making photo page request:", err));
}

function getThumbnailImages(json) {
	// console.log("json:", json);
	if (json.thumbnails) {
		const $ = cheerio.load(json.thumbnails);
		const images = $('img');
		console.log("images.length:", images.length);
		const urls = [];
		images.each((i, el) => urls.push($(el).attr("src")));
		// console.log("urls:", urls);
		return urls;
	}
}

