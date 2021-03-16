import Cache from '../cache/Cache.js';
import DAO from '../data/DAO.js';
import YelpScraper from '../scrapers/yelp/YelpScraper.js';
import Restaurant from '../domain/Restaurant.js';

let client;
let yelp;
let cache;
let dao;

class SearchService {

	constructor(_client) {
		client = _client;
		yelp = new YelpScraper(client);
		cache = new Cache();
		dao = new DAO();
	}

	find({location, description, distance}) {
		const query = location + description + distance;
		const cachedResults = cache.getQuery(query);
		// console.log("cachedResults:", cachedResults);
		if (cachedResults)
			return Promise.resolve(cachedResults.restaurants);

		return resolveQuery({location, description, distance}, cache)
			.then(({restaurants, geodata}) => Promise.all([getRestaurantsMedia(restaurants), geodata]))
			.then(results => {
				const [restaurants, geodata] = results;
				console.log(`Caching ${restaurants.length} restaurants.`);
				cache.cacheQuery(query, {restaurants});
				console.log(`Caching geodata for location: ${location}.`);
				cache.cacheGeodata(location, geodata);
				return restaurants;
			})
			.then(restaurants => restaurants.map(restaurant => restaurant.toJSON()));
	}
};

function resolveQuery(query, cache) {
	const { location, distance } = query;

	if (distance) {
		// Check whether applicable geodata has already been cached
		return resolveGeodata(location, cache)
			.then(geodata => yelp.resolveQuery(query, geodata));
	}

	return yelp.resolveQuery(query);
}

function resolveGeodata(location, cache) {
	const cachedGeodata = cache.getGeodata(location);

	if (cachedGeodata) {
		return Promise.resolve(cachedGeodata);
	}

	// Resolve geodata and cache before continuing with query
	console.log("Making preliminary request to get needed geodata.");
	return yelp.resolveQuery({location})
		.then(({geodata}) => {
			cache.cacheGeodata(location, geodata);
			return geodata;
	});
}

function getRestaurantsMedia(restaurants) {
	return Promise.all(restaurants.map(getRestaurantMedia));
}

function getRestaurantMedia(restaurant) {
	const cachedRestaurant = cache.getRestaurant(restaurant.id);
	
	if (cachedRestaurant) {
		console.log("Restaurant resolved from cache:", cachedRestaurant.name);
		return cachedRestaurant;
	}

	// console.log("restaurant.name:", restaurant.name);
	// console.log("restaurant.id:", restaurant.id);
	return dao.findRestaurantByID(restaurant.id)
		.then(bson => {
			if (!bson)
				return scrapeRestaurantMedia(restaurant);
			console.log("Restaurant resolved from DB:", restaurant.name);
			return instanceFromBSON(bson);
		})
		.then(restaurant => {
			cache.cacheRestaurant(restaurant);
			return restaurant;
		});
}

function scrapeRestaurantMedia(restaurant) {
	return yelp.retrieveMedia(restaurant)
		.then(media => restaurant.addMedia(media))
		.then(restaurant => dao.saveRestaurant(restaurant))
		.then(() => console.log("Persisting scraped restaurant:", restaurant.name))
		// .then(() => console.log("Persisted ID:", restaurant.id))
		.then(() => restaurant);
}

function instanceFromBSON(bson) {
	return new Restaurant().populateFromBSON(bson);
}

export default SearchService;
