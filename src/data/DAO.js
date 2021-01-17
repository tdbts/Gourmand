import MongoClient from 'mongodb';
const URL = process.env.MONGODB_URI;
const DB = "gourmand";
const RESTAURANTS_COLLECTION = "restaurants";

export default class DAO {

	initialize() {
		// return Promise.resolve();
		let _client;

		console.log("URL:", URL);
		return MongoClient.connect(URL)
			.then(client => {
				console.log("client:", client);
				_client = client;
				return client.db(DB);
			})
			.then(db => db.createCollection(RESTAURANTS_COLLECTION))
			.then(() => _client.close())
			.catch(e => onError(e, _client)); 
	}

	findRestaurantByID(id) {
		return collectionOperation(collection => collection.findOne({id}));
	}

	findRestaurantsByIDs(ids) {
		return collectionOperation(collection => collection.find({id: {$in: ids}}));
	}

	saveRestaurant(restaurant) {
		return collectionOperation(collection => collection.insertOne(restaurant.toJSON()));
	}

	saveRestaurants(restaurants) {
		return collectionOperation(collection => collection.insertMany(restaurants.map(restaurant => restaurant.toJSON())));
	}

};

function collectionOperation(operation) {
	let _client;

	return MongoClient.connect(URL)
		.then(client => {
			_client = client;
			return client.db(DB);
		})
		.then(db => db.collection(RESTAURANTS_COLLECTION))
		.then(operation)
		.then(result => {
			_client.close();
			return result;
		})
		.catch(e => onError(e, _client));
}

function onError(e, client) {
	console.log("e:", e);
	return client.close()
		.then(() => {
			throw e;
		});
}