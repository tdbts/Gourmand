import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

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

	saveUser(user) {
		return user.save();
	}

	findUserByEmail(email) {
		return User.findOne({ email });
	}

};

function onError(err) {
	console.log("DB error:", err);
	throw err;
}
