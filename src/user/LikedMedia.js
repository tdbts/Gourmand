/*

// User: data
{
	liked: {
		[restaurant id]: Set<id>
	}
}

*/
export default class LikedMedia {

	constructor(data = {}, storage) {
		this.liked = (typeof data === 'string') ? hydrate(data) : data;
		this.storage = storage;
	}

	toggle(restaurantID, id) {
		const liked = { ...this.liked };

		this.liked = isLiked(liked, restaurantID, id)
			? unlikeMedia(liked, restaurantID, id)
			: likeMedia(liked, restaurantID, id

		// TODO: Set up event mechanism for updating storage
		updateStorage(this.storage, this.serialize());
	}

	serialize() {
		const json = {};

		for (const restaurantID in this.liked) {
			json.restaurantID = [...this.liked[restaurantID]];
		}

		return JSON.stringify(json);
	}
}

/*
 * Utility Functions
 */
function isLiked(liked, restaurantID, id) {
	return (restaurantID in liked)
		&& (id in (liked[restaurantID]));
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

	return liked;
}

function updateStorage(storage, data) {
	storage.set('liked', data);
}

function hydrate(data) {
	const json = JSON.parse(data);

	for (const restaurantID in json) {
		json[restaurantID] = new Set(json[restaurantID]);
	}

	return json;
}
