const request = require('superagent');
const YelpScraper = require('./YelpScraper');
const location = "Brooklyn, NY 11219";
const scraper = new YelpScraper(request);

scraper.findRestaurants(location)
	.then(restaurants => {
		console.log("restaurants:", restaurants);
		restaurants.forEach(restaurant => scraper.retrieveMedia(restaurant)
			.then(images => {
				console.log("restaurant.name:", restaurant.name);
				console.log("images:", images);
			}));
	});
