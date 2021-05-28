import _ from 'underscore';
import Media from './Media.js';

export default class Restaurant {

	constructor(id, name, address, neighborhoods, categories, rating, mediaCount, media) {
		this.id = id;
		this.name = name;
		this.address = address;
		this.neighborhoods = neighborhoods;
		this.categories = categories;
		this.rating = rating;
		this.mediaCount = mediaCount;
		this.media = media || [];
	}

	setMediaCount(count) {
		this.mediaCount = count;
		return this;
	}

	addMedia(media) {
		this.media = this.media.concat(media);
		return this;
	}

	toJSON() {
		const obj = _.pick(this, 'id', 'name', 'address', 'neighborhoods', 'categories', 'rating', 'mediaCount', 'media');

		if (obj.media)
			obj.media = obj.media.map(media => media.toJSON());

		return obj;
	}
}
