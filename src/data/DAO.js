import MongoClient from 'mongodb';
import Restaurant from '../models/Restaurant.js';

export default class DAO {

	findRestaurantByID(id) {
		return Restaurant.findOne({id})
			.catch(onError);
	}

	findRestaurantsByIDs(ids) {
		return Restaurant.find({id: {$in: ids}})
			.catch(onError);
	}

	saveRestaurant(restaurant) {
		return Restaurant.create(restaurant.toJSON())
			.catch(onError);
	}

	saveRestaurants(restaurants) {
		return Restaurant.insertMany(restaurants.map(restaurant => restaurant.toJSON()))
			.catch(onError);
	}

};

function onError(err) {
	console.log("DB error:", err);
	throw err;
}
