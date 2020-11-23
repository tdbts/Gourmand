/*
 * SearchQuery
 */
module.exports = class SearchQuery {
	constructor(text, type) {
		this.text = text;
		this.type = type;
	}

	getText() {
		return this.text;
	}

	getType() {
		return this.type;
	}
};
