/*
 * SearchQuery
 */
import constants from "./constants.js";

class SearchQuery {
	constructor({location, description, distance}, geodata) {
		this.location = location;
		this.type = parseLocationType(location);
		this.description = description;
		this.distance = distance ? geodata[parseInt(distance)] : null;
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

	getDistance() {
		return this.distance;
	}
}

function parseLocationType(location) {
	// TODO: Differentiate
	return constants.queryTypes.LOCATION;
}

export default SearchQuery;
