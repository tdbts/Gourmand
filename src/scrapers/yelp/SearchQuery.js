/*
 * SearchQuery
 */
export default class SearchQuery {
	constructor(location, type, description) {
		this.location = location;
		this.type = type;
		this.description = description;
	}

	getLocation() {
		return this.location;
	}

	getType() {
		return this.type;
	}

	getDescription() {
		return this.description;
	}
};
