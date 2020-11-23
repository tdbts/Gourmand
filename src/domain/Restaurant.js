module.exports = class Restaurant {

	constructor(id, name, address, neighborhoods, categories, rating, mediaCount, media) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.neighborhoods = neighborhoods;
		this.categories = categories;
		this.rating = rating;
		this.mediaCount = mediaCount;
		this.media = media;
	}

}
