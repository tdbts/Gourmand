import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import MediaModal from './components/MediaModal';

const lookup = { restaurantsByID: {}, mediaByID: {}, restaurantIDsByMediaID: {} };

function updateSearchURL(description, location, setURL) {
	console.log("updateSearchURL()");
	console.log("description:", description);
	console.log("location:", location);
	if (!location)
		return;

	const url = createSearchURL(description, location);
	console.log("url:", url);
	return setURL(url);
}

function createSearchURL(description, location) {
	return `/search?description=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
}

function updateLookup(lookup, restaurants) {
	lookup.restaurantsByID = updateRestaurantsByID(restaurants);
	lookup.mediaByID = updateMediaByID(restaurants);
	lookup.restaurantIDsByMediaID = updateRestaurantIDsByMediaID(restaurants);
}

function updateRestaurantsByID(restaurants) {
	return restaurants.reduce((map, restaurant) => {
		map[restaurant.id] = restaurant;
		return map;
	}, {});
}

function updateMediaByID(restaurants) {
	return restaurants
		.flatMap(restaurant => restaurant.media)
		.reduce((map, media) => {
			map[media.id] = media;
			return map;
		});
}

function updateRestaurantIDsByMediaID(restaurants) {
	return restaurants.reduce((map, restaurant) => ({...map, ...mapMediaIDtoRestaurantID(restaurant)}), {});
}

function mapMediaIDtoRestaurantID(restaurant) {
	return restaurant.media
		.reduce((map, media) => {
			map[media.id] = restaurant.id;
			return map;
		}, {});
}

function getSelectedMediaInfo(selectedID, lookup) {
	const media = lookup.mediaByID[selectedID];
	const restaurant = lookup.restaurantsByID[lookup.restaurantIDsByMediaID[selectedID]];
	return { media, restaurant };
}

function App() {
	const [url, setURL] = useState('');
	const [restaurants, setRestaurants] = useState([]);
	const [selectedMediaID, setSelectedMediaID] = useState('');
	const [searching, setSearching] = useState(false);

	console.log("selectedMediaID:", selectedMediaID);
	useEffect(() => {
		if (url) {
			console.log("Making request:", url);
			setSearching(true);

			fetch(url)
				.then(response => response.json())
				.then(json => {
					updateLookup(lookup, json);
					console.log("lookup:", lookup);
					setRestaurants(json);
					setSearching(false);
				});
		}
	}, [url])

	return (
		<div className="App">
			<div className="header-container">
				<h1 className="title-header">Gourmand</h1>
				<SearchForm onSearchRequest={(description, location) => updateSearchURL(description, location, setURL)} searching={searching} />
			</div>
			{selectedMediaID && <MediaModal selected={getSelectedMediaInfo(selectedMediaID, lookup)} onClose={() => setSelectedMediaID('')} />}
			<Gallery restaurants={restaurants} onMediaSelection={setSelectedMediaID} />
		</div>
	);
}

export default App;
