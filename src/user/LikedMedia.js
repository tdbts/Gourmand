/*

// User: data
{
	liked: {
		[restaurant id]: Set<id>
	}
}

*/
export default class LikedMedia {

	constructor(data, storage) {
		this.liked = setLiked(data);
		this.storage = storage;
	}

	toggle(restaurantID, id) {
		const liked = { ...this.liked };
		const newLikedState = !isLiked(liked, restaurantID, id);

		this.liked = newLikedState
			? likeMedia(liked, restaurantID, id)
			: unlikeMedia(liked, restaurantID, id);

		// TODO: Set up event mechanism for updating storage
		updateStorage(this.storage, this.serialize());

		return newLikedState;
	}

	getAll() {
		return this.liked;
	}

	isLiked(restaurantID, id) {
		return isLiked(this.liked, restaurantID, id);
	}

	serialize() {
		const json = {};

		for (const restaurantID in this.liked) {
			json[restaurantID] = [...this.liked[restaurantID]];
		}

		return JSON.stringify(json);
	}
}

/*
 * Utility Functions
 */
function setLiked(data) {
	if (!(data))
		return {};

	// Assume data is pre-hydrated object if not string
	return (typeof data === 'string') ? hydrate(data) : data;
}

function isLiked(liked, restaurantID, id) {
	return (restaurantID in liked)
		&& liked[restaurantID].has(id);
}

function likeMedia(liked, restaurantID, id) {
	if (!(restaurantID in liked)) {
			liked[restaurantID] = new Set();
	}

	liked[restaurantID].add(id);

	return liked;
}

function unlikeMedia(liked, restaurantID, id) {
	liked[restaurantID].delete(id);

	if (liked[restaurantID].size === 0) {
		delete liked[restaurantID];
	}

	return liked;
}

function updateStorage(storage, data) {
	storage.set('likedMedia', data);
}

function hydrate(data) {
	const json = JSON.parse(data);

	for (const restaurantID in json) {
		json[restaurantID] = new Set(json[restaurantID]);
	}

	return json;
}
