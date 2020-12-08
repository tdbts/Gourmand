import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import _  from 'underscore';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import YelpMedia from './scrapers/yelp/YelpMedia';

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

function getShuffledMedia(restaurants) {
	console.log("restaurants:", restaurants);
	const allMedia = restaurants.flatMap(restaurant => restaurant.media);
	console.log("allMedia:", allMedia);
	const shuffledMedia = _.shuffle(allMedia);
	// console.log("shuffledMedia:", shuffledMedia);
	return shuffledMedia.map(media => (new YelpMedia().populateFromBSON(media)));
}

function App() {
	const [url, setURL] = useState('');
	const [restaurants, setRestaurants] = useState([]);
	const [shuffledMedia, setShuffledMedia] = useState([]);

	useEffect(() => {
		if (url) {
			console.log("Making request:", url);
			fetch(url)
				.then(response => response.json())
				.then(json => setRestaurants(json));
		}
	}, [url])

	useEffect(() => {
		setShuffledMedia(getShuffledMedia(restaurants));
	}, [restaurants]);

	return (
		<div className="App">
			<h1 className="title-header">Gourmand</h1>
			<SearchForm onSearchRequest={(description, location) => updateSearchURL(description, location, setURL)} />
			<Gallery media={shuffledMedia} />
		</div>
	);
}

export default App;
