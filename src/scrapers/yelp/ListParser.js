const cheerio = require('cheerio');
const YelpRestaurant = require('./YelpRestaurant');

module.exports = class ListParser {

	constructor() {

	}

	parse(text) {
		console.log("Parsing search response for restaurant data.");
		const $ = cheerio.load(text);
		const jsonEl = getJSONScriptElement($);
		const json = getJSONFromScript($, jsonEl);
		const restaurantsData = getRestaurantDataFromJSON(json);
		return restaurantsFromData(restaurantsData);
	}

};

function getJSONScriptElement($) {
	const applicationScripts = $('script[type="application/json"]');
	// console.log("applicationScripts:", applicationScripts);
	const jsonEl = applicationScripts
		.filter((i, el) => 'hypernovaKey' in $(el).data())[0];
	// console.log("jsonEl:", jsonEl);
	return jsonEl;
}

function getJSONFromScript($, jsonEl) {
	const jsonStr = $(jsonEl).html().slice(4, -3);
	// console.log("jsonStr:", jsonStr);
	const json = JSON.parse(jsonStr);
	// console.log("json:", json);
	return json;
}

function getRestaurantDataFromJSON(json) {
	return json.legacyProps.searchAppProps.searchPageProps.searchMapProps.hovercardData;
}

function restaurantsFromData(restaurantsData) {
	return Object.keys(restaurantsData)
		.map(id => {
			const json = restaurantsData[id];
			console.log("json:", json);
			
			return new YelpRestaurant(
				id, 
				json.name, 
				json.addressLines, 
				json.neighborhoods,
				json.categories.map(categoryObj => categoryObj.title),
				json.rating,
				json.photoPageUrl)
		});
}
