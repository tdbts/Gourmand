import Cache from '../cache/Cache.js';
import DAO from '../data/DAO.js';
import YelpScraper from '../scrapers/yelp/YelpScraper.js';
import Restaurant from '../domain/Restaurant.js';

let client;
let yelp;
let cache;
let dao;

export default class SearchService {

	constructor(client) {
		client = client;
		yelp = new YelpScraper(client);
		cache = new Cache();
		dao = new DAO();
	}

	start() {
		return dao.initialize();
	}

	find(location, description) {
		const query = location + description;
		const cachedResults = cache.getQuery(query);
		// console.log("cachedResults:", cachedResults);
		if (cachedResults)
			return Promise.resolve(cachedResults.restaurants);

		return yelp.findRestaurants(location, description)
			.then(getRestaurantsMedia)
			.then(restaurants => {
				console.log(`Caching ${restaurants.length} restaurants.`);
				cache.cacheQuery(query, restaurants);
				return restaurants;
			})
			.then(restaurants => restaurants.map(restaurant => restaurant.toJSON()));
	}

};

function getRestaurantsMedia(restaurants) {
	return Promise.all(restaurants.map(getRestaurantMedia));
}

function getRestaurantMedia(restaurant) {
	const cachedRestaurant = cache.getRestaurant(restaurant.id);
	
	if (cachedRestaurant) {
		console.log("Restaurant resolved from cache:", cachedRestaurant.name);
		return cachedRestaurant;
	}

	console.log("restaurant.name:", restaurant.name);
	console.log("restaurant.id:", restaurant.id);
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