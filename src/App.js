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
const likedMedia = new LikedMedia(getLikedMedia(), storage);

function getLikedMedia(storage) {
	try {
		return new LikedMedia(storage.get('likedMedia'), storage);
	} catch (e) {
		window.console.debug(e);
	}
}

function isLikedMedia(id) {
	return id && likedMedia.isLiked(lookup.getRestaurantIDByMediaID(id), id);
}

function toggleLikedMedia(id, setLikedMedia) {
	likedMedia.toggle(lookup.getRestaurantIDByMediaID(id), id);
	setLikedMedia(likedMedia.getAll());
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
	const [likedMedia, setLikedMedia] = useState({});
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
				<div className="header-content-wrapper">
					<h1 className="title-header">Gourmand</h1>
					<SearchForm onSearchRequest={(description, location) => updateSearchURL(description, location, setURL)} searching={searching} />
				</div>
			</div>
			{selectedMediaID && <MediaModal selected={getSelectedMediaInfo(selectedMediaID, lookup)} onMediaLikeToggle={(id) => toggleLikedMedia(id, setLikedMedia)} onClose={() => setSelectedMediaID('')} isLiked={isLikedMedia(selectedMediaID)} />}
			<Gallery restaurants={restaurants} onMediaSelection={setSelectedMediaID} isLikedMedia={isLikedMedia} />
		</div>
	);
}

export default App;
