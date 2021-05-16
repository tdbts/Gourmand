/*

// User: data
{
	liked: {
		[restaurant id]: Set<id>
	}
}

*/
export default class LikedMedia {

	constructor(data) {
		this.liked = setLiked(data);
	}

	static setify(json) {
		return setify(json);
	}

	toggle(restaurantID, id) {
		const liked = { ...this.liked };
		const newLikedState = !isLiked(liked, restaurantID, id);

		this.liked = newLikedState
			? likeMedia(liked, restaurantID, id)
			: unlikeMedia(liked, restaurantID, id);

		return newLikedState;
	}

	getAll() {
		return this.liked;
	}

	isLiked(restaurantID, id) {
		return isLiked(this.liked, restaurantID, id);
	}

	unlike(restaurantID, id) {
		if (isLiked(this.liked,restaurantID, id)) {
			unlikeMedia(this.liked, restaurantID, id);
		}
	}

	merge(likedMedia) {
		Object.keys(likedMedia)
			.forEach(restaurantID => likedMedia[restaurantID]
				.forEach(mediaID => likeMedia(this.liked, restaurantID, mediaID)));
	}

	serialize() {
		return JSON.stringify(listify(this.liked));
	}

	listify() {
		return listify(this.liked);
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

function hydrate(data) {
	return setify(JSON.parse(data));
}

function setify(json) {
	const liked = {};

	for (const restaurantID in json) {
		liked[restaurantID] = new Set(json[restaurantID]);
	}

	return liked;
}

function listify(liked) {
	const json = {};

	for (const restaurantID in liked) {
		json[restaurantID] = [...liked[restaurantID]];
	}

	return json;
}