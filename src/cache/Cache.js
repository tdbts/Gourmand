// Map<Query, {cacheTime: Date, restaurants: Set<RestaurantID>}>
const queries = {};
// Map<RestaurantID, Restaurant>
const restaurants = {};

/*
 * Cache
 */
module.exports = class Cache {

	getQuery(query) {
		return queries[query];
	}

	cacheQuery(query, restaurants) {
		queries[query] = {
			cacheTime: new Date(),
			restaurants
		};
	}

	getRestaurant(id) {
		return restaurants[id];
	}

	cacheRestaurant(restaurant) {
		restaurants[restaurant.id] = restaurant;
	}

	cacheRestaurants(restaurants) {
		restaurants.forEach(restaurant => this.cacheRestaurant(restaurant));
	}

};
