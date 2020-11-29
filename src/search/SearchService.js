const Cache = require('../cache/Cache');
const DAO = require('../data/DAO');
const YelpScraper = require('../scrapers/yelp/YelpScraper');

let client;
let yelp;
let cache;
let dao;

module.exports = class SearchService() {

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
		
		if (cachedResults)
			return cachedResults;

		return yelp.findRestaurants(location, description)
			.then(getRestaurantsMedia)
			.then(restaurants => {
				cache.cacheQuery(query, restaurants);
				return restaurants;
			});
	}

};

function getRestaurantsMedia(restaurants) {
	return Promise.all(restaurants.map(getRestaurantMedia));
}

function getRestaurantMedia(restaurant) {
	const cachedRestaurant = cache.getRestaurant(restaurant.id);
	
	if (cachedRestaurant)
		return cachedRestaurant;

	return dao.findRestaurantByID(restaurant.id)
		.then(restaurant => {
			if (!restaurant)
				return scrapeRestaurantMedia(restaurant);

			return instanceFromBSON(restaurant);
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
		.then(() => restaurant);
}

function instanceFromBSON(bson) {
	return new Restaurant().populateFromBSON(bson);
}