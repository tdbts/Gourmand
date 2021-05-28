import mongoose from "mongoose";
import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

export default class DAO {

	setDebug(value) {
		mongoose.set('debug', value);
	}

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

	saveUser(user) {
		return user.save();
	}

	findUserByEmail(email) {
		return User.findOne({ email });
	}

	updateUser(email, updates) {
		return User.updateOne({ email }, updates);
	}

};

function onError(err) {
	console.log("DB error:", err);
	throw err;
}
