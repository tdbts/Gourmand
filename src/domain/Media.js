const _ = require('underscore');

module.exports = class Media {

	constructor(id, type, caption, source) {
		this.id = id;
		this.type = type;
		this.caption = caption;
		this.source = source;
	}

	toPersistedObject() {
		return _.pick(this, 'id', 'type', 'caption', 'source');
	}

}
