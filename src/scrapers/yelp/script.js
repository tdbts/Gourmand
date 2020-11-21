const request = require('superagent');
const yelpScraper = require('./scraper');
const queryText = "Brooklyn, NY 11219";
const scraper = yelpScraper(request);
scraper.find(queryText);
