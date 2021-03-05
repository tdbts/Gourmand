import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: false
	},
	caption: {
		type: String,
		required: false
	},
	source: {
		type: String,
		required: true
	}
});

const restaurantSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	address: {
		type: [String],
		required: true
	},
	neighborhoods: {
		type: [String],
		required: false
	},
	categories: {
		type: [String],
		required: false
	},
	rating: {
		type: Number,
		min: 0,
		max: 5
	},
	mediaCount: {
		type: Number,
		required: true,
		default: 0
	},
	media: {
		type: [mediaSchema],
		required: false
	}
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;