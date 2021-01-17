import _ from'underscore';

export default class Media {

	constructor(id, type, caption, source) {
		this.id = id;
		this.type = type;
		this.caption = caption;
		this.source = source;
	}

	toJSON() {
		return _.pick(this, 'id', 'type', 'caption', 'source');
	}

	populateFromBSON(bson) {
		const { id, type, caption, source } = bson;

		this.id = id;
		this.type = type;
		this.caption = caption;
		this.source = source;

		return this;
	}

}
