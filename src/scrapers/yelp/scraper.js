const cheerio = require('cheerio');
const url = require('url');
const DOMAIN = "https://www.yelp.com";
const LOCATION_SEARCH_PREFIX = DOMAIN + "/search?find_desc=Restaurants&";
const queryTypes = {
	LOCATION: 'location',
	COORDINATE: 'coordinate'
};

let request;

module.exports =  function yelpScraper(client) {
	
	request = client;

	return {

		find(queryText) {
			const query = createLocationQuery(queryText, queryTypes.LOCATION);
			const response = makeSearchRequest(query)
				.then(processSearchResponse)
				.then(processRestaurantsJSON);
		}

	};

}

/*

Domain
	- Query
	- SearchResults // TODO: Decouple 'SearchResultPage' from platform with a 'SearchResultProvider'
		* SearchResultPage
			- getRestaurants()
		* getNext()
		* getPrevious()
	- Restaurant
		* Name
		* Location
			- getAddress()
			- getCoordinates()
		* Photopages  // TODO: Decouple 'Restaurant' from platform with a 'Photoprovider'
			- Photopage
				* getImages()
			- getPhotoPageByIndex()
			- getNext()
			- getPrevious()
		* Categories
		* Neighborhoods
		* Reviews
		* Rating

*/

function createRestaurant(id, json) {

	const _id = id;
	const _json = json;
	const _photos = [];

	function getPhotoPageURL(photoPagePath) {
		return DOMAIN + photoPagePath + "?tab=food";
	}

	function getPhotoPagePath(json) {
		// console.log("json.photoPageURL:", json.photoPageURL);
		if (json.photoPageUrl) {
			const photoPagePath = url.parse(json.photoPageUrl).pathname;
			console.log("photoPagePath:", photoPagePath);	

			return photoPagePath;
		}
	}	

	return {
		getID() {
			return _id;
		},

		getName() {
			return _json.name;
		},

		getPhotoPageURL() {
			return getPhotoPageURL(getPhotoPagePath(_json));
		},

		getPhotos() {
			return _photos;
		},

		addPhotos(images) {
			_photos.push(...images);
		}
	};

}

function createYelpPhotoProvider(restaurant) {

	const _restaurant = restaurant;

	function makePhotoPageRequest(photoPageURL) {
		console.log("Making request to:", photoPageURL);
		return request
			.get(photoPageURL)
			.set("x-requested-with", "XMLHttpRequest")
			.catch(err => console.error("Error making photo page request:", err));
	}

	function getThumbnailImages(json) {
		// console.log("json:", json);
		if (json.thumbnails) {
			const $ = cheerio.load(json.thumbnails);
			const images = $('img');
			console.log("images.length:", images.length);
			const urls = [];
			images.each((i, el) => urls.push($(el).attr("src")));
			// console.log("urls:", urls);
			return urls;
		}
	}

	return {
		getNext() {
			return makePhotoPageRequest(_restaurant.getPhotoPageURL())
				.then(response => response.body)
				.then(getThumbnailImages);
		},

		getRestaurant() {
			return _restaurant;
		}
	};
}

function processRestaurantsJSON(json) {
	const requests = [];
	const restaurants = [];

	for (const id in json) {
		const restaurant = createRestaurant(id, json[id]);
		const photoProvider = createYelpPhotoProvider(restaurant);
		
		restaurants.push(restaurant);
		requests.push(photoProvider.getNext().then(photos => {
			restaurant.addPhotos(photos);
			return photos;
		}));
	}

	return Promise.all(requests)
		.then(() => {
			restaurants.forEach(restaurant => {
				console.log("restaurant.getName():", restaurant.getName());
				console.log("restaurant.getPhotos():", restaurant.getPhotos());
			});
		});
}

function processSearchResponse(response) {
	if (response.status < 300) {
		const json = parseRestaurantsJSON(response);
		// console.log("json:", json);
		return json;
	} else {
		console.log("response:", response);
		throw new Error("Location query returned status code:", response.status);
	}
}

function parseRestaurantsJSON(response) {
	console.log("Parsing JSON for restaurant data.");
	const $ = cheerio.load(response.text);
	const jsonEl = getJSONScriptElement($);
	const json = getJSONFromScript($, jsonEl);
	return getRestaurantDataFromJSON(json);
}

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

function makeSearchRequest(query) {
	const url = getSearchURL(query);
	console.log("Making search request:", url);
	return request.get(url)
		// .then(response => console.log("response:", response)
		.catch(err => console.error("Error making search request:", err))
}

function getSearchURL(query) {
	return locationSearchFormatters[query.getType()](query);
}

function createLocationQuery(text, type) {
	return {
		getType() {
			return type;
		},
		getText() {
			return text;
		}
	}
}

const locationSearchFormatters = {
	location(query) {
		const ATTRIBUTE = "find_loc=";
		// Example query: "Brooklyn, NY 11219" or "Brooklyn"
		const location = query.getText()
			.split(" ")
			.map(piece => encodeURIComponent(piece))
			.join("+");

		return LOCATION_SEARCH_PREFIX + ATTRIBUTE + location;
	},

	coordinate(query) {
		// Example query: "40.625513999999995,-74.0008562,30"
		const ATTRIBUTE = "l=";
		const COUNTRY_CODE = "a:";
		const location = encodeURIComponent(COUNTRY_CODE + query.getText());

		return LOCATION_SEARCH_PREFIX + location;
	}
};