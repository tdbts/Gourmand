/*

// User: data
{
	id: '',
	likedMedia: {
		[restaurant id]: ['']
	}
}

*/
export default class User {

	constructor(data, storage) {
		this.data = setData(data);
		this.storage = storage;
	}

	likeMedia(restaurantID, id) {
		if (!(restaurantID in this.data.likedMedia))
			this.data.likedMedia[restaurantID] = [];

		this.data.likedMedia[restaurantID] = this.data.likedMedia.concat(id);
		// TODO: Set up event mechanism for updating storage
		this.storage.set('likedMedia', JSON.stringify(this.data.likedMedia));
	}

	getLikedMedia() {
		return this.data.likedMedia;
	}

}

/*
 * Utility Functions
 */
function setData(data = { likedMedia: {} }) {
	return data;
}
