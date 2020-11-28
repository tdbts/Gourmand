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

	findRestaurantsByIDs(ids) {
		return collectionOperation(collection => collection.find({_id: {$in: ids}}));
	}

	saveRestaurants(restaurants) {
		return collectionOperation(collection => collection.insertMany(restaraunts));
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
