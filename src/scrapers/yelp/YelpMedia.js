const Media = require('../../domain/Media');

export default class YelpMedia extends Media {

	constructor(id, type, caption, source) {
		super(id, type, caption, source);
	}

	getThumbnailURLs() {
		const stem = this.source.slice(0, -5);

		return [
			stem + '258s.jpg',
			stem + '300s.jpg',
			stem + '348s.jpg'
		];
	}

}