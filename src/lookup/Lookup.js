/*
 * Lookup
 */
 const lookup = { 
 	restaurantsByID: {}, 
 	mediaByID: {}, 
 	restaurantIDsByMediaID: {},
	restaurantsByURL: {}
 };

export default class Lookup {
	update(url, restaurants) {
		updateLookup(lookup, url, restaurants);
	}

	getMediaByID(id) {
		return lookup.mediaByID[id];
	}

	getRestaurantByID(id) {
		return lookup.restaurantsByID[id];
	}

	getRestaurantIDByMediaID(id) {
		return lookup.restaurantIDsByMediaID[id];
	}

	getRestaurantsByURL(url) {
		return lookup.restaurantsByURL[url];
	}
};

function updateLookup(lookup, url, restaurants) {
	lookup.restaurantsByID = combineMaps(lookup.restaurantsByID, updateRestaurantsByID(restaurants));
	lookup.mediaByID = combineMaps(lookup.mediaByID, updateMediaByID(restaurants));
	lookup.restaurantIDsByMediaID = combineMaps(lookup.restaurantIDsByMediaID, updateRestaurantIDsByMediaID(restaurants));
	lookup.restaurantsByURL = combineMaps(lookup.restaurantsByURL, updateRestaurantsByURL(url, restaurants));
}

function updateRestaurantsByID(restaurants) {
	return restaurants.reduce((map, restaurant) => {
		map[restaurant.id] = restaurant;
		return map;
	}, {});
}

function updateMediaByID(restaurants) {
	return restaurants
		.flatMap(restaurant => restaurant.media)
		.reduce((map, media) => {
			map[media.id] = media;
			return map;
		}, {});
}

function updateRestaurantIDsByMediaID(restaurants) {
	return restaurants.reduce((map, restaurant) => (combineMaps(map, mapMediaIDtoRestaurantID(restaurant))), {});
}

function mapMediaIDtoRestaurantID(restaurant) {
	return restaurant.media
		.reduce((map, media) => {
			map[media.id] = restaurant.id;
			return map;
		}, {});
}

function updateRestaurantsByURL(url, restaurants) {
	const map = {};
	map[url] = restaurants;
	return map;
}

function combineMaps(existing, update) {
	return { ...existing, ...update };
}