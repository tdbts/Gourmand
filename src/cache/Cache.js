// Map<Query, {cacheTime: Date, restaurants: Set<RestaurantID>}>
const queries = {};
// Map<RestaurantID, Restaurant>
const restaurants = {};
// Map<Location, Geodata>
const geodata = {};

/*
 * Cache
 */
export default class Cache {

	getQuery(query) {
		return queries[query];
	}

	cacheQuery(query, data) {
		queries[query] = {
			cacheTime: new Date(),
			...data
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

	cacheGeodata(location, data) {
		geodata[location] = data;
	}

	getGeodata(location) {
		return geodata[location];
	}

};
