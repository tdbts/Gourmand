import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForm from './components/SearchForm';
import Gallery from './components/Gallery';
import MediaModal from './components/MediaModal';
import Lookup from './lookup/Lookup';
import StorageFactory from './storage/StorageFactory';
import LikedMedia from './user/LikedMedia';

const lookup = new Lookup();
const storage = new StorageFactory().get(window.localStorage);
const likedMedia = new LikedMedia(getLikedMedia());

function getLikedMedia(storage) {
	try {
		return new LikedMedia(storage.get('likedMedia'), storage);
	} catch (e) {
		window.console.debug(e);
	}
}

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

function getSelectedMediaInfo(selectedID, lookup) {
	const media = lookup.getMediaByID(selectedID);
	const restaurant = lookup.getRestaurantByID(lookup.getRestaurantIDByMediaID(selectedID));
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
					lookup.update(json);
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
