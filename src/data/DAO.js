const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/gourmand";
const RESTAURANTS_COLLECTION = "restaurants";

module.exports = class DAO {

	initialize() {
		return MongoClient.connect(URL)
			.then(db => db.createCollection(RESTAURANTS_COLLECTION).then(() => db))
			.then(db => db.close())
			.catch(e => throw e); 
	}

	findRestaurantByID(id) {
		return collectionOperation(collection => collection.findOne({_id: id}));
	}

	findRestaurantsByIDs(ids) {
		return collectionOperation(collection => collection.find({_id: {$in: ids}}));
	}

	saveRestaurant(restaurant) {
		return collectionOperation(collection => collection.insertOne(restaurant.toPersistedObject()));
	}

	saveRestaurants(restaurants) {
		return collectionOperation(collection => collection.insertMany(restaraunts.map(restaurant => restaurant.toPersistedObject())));
	}

};

function collectionOperation(operation) {
	return MongoClient.connect(URL)
		.then(db => db.collection(RESTAURANTS_COLLECTION)
			.then(operation)
			.then(() => db))
		.then(db => db.close())
		.catch(e => throw e);	
}
