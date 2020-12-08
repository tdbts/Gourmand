import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';

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

function App() {
	const [url, setURL] = useState('');
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		if (url) {
			console.log("Making request:", url);
			fetch(url)
				.then(response => response.json())
				.then(json => setRestaurants(json));
		}
	}, [url])

	return (
		<div className="App">
			<h1 className="title-header">Gourmand</h1>
			<SearchForm onSearchRequest={(description, location) => updateSearchURL(description, location, setURL)} />
			<Gallery restaurants={restaurants} />
		</div>
	);
}

export default App;
