import { useState, useEffect } from 'react';
import './App.css';
import constants from './scrapers/yelp/constants';
import Header from './components/Header';
import Gallery from './components/Gallery';
import ErrorMessage from './components/ErrorMessage';
import MediaModal from './components/MediaModal';
import Lookup from './lookup/Lookup';
import StorageFactory from './storage/StorageFactory';
import LikedMedia from './user/LikedMedia';

const { distances } = constants;
const lookup = new Lookup();
const storage = new StorageFactory().get(window.localStorage);
const likedMedia = new LikedMedia(getLikedMedia(storage), storage);

function getLikedMedia(storage) {
	try {
		return storage.get('likedMedia');
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

function checkResponseForErrors(response) {
	if (response.ok) {
		return response;
	}

	throw Error(response.statusText);
}

function scrollToTop() {
	window.scroll({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}

function App() {
	const [url, setURL] = useState('');
	const [restaurants, setRestaurants] = useState([]);
	const [selectedMediaID, setSelectedMediaID] = useState('');
	const [likedMedia, setLikedMedia] = useState({});
	const [searching, setSearching] = useState(false);
	const [error, setError] = useState(null);
	const [distance, setDistance] = useState(distances.UNKNOWN);
	const [showLiked, setShowLiked] = useState(false);

	// console.log("selectedMediaID:", selectedMediaID);
	useEffect(() => {
		if (url) {
			console.log("Making request:", url);
			setError(null);
			setSearching(true);

			fetch(url)
				.then(checkResponseForErrors)
				.then(response => response.json())
				.then(json => {
					lookup.update(json);
					console.log("lookup:", lookup);
					setRestaurants(json);
					setSearching(false);
					scrollToTop();
				})
				.catch(e => setError(e));
		}
	}, [url])

	return (
		<div className="app">
			<Header onSearchRequest={(description, location) => updateSearchURL(description, location, setURL)} setShowLiked={setShowLiked} distance={distance} setDistance={setDistance} />
			{selectedMediaID && <MediaModal selected={getSelectedMediaInfo(selectedMediaID, lookup)} onMediaLikeToggle={(id) => toggleLikedMedia(id, setLikedMedia)} onClose={() => setSelectedMediaID('')} isLiked={isLikedMedia(selectedMediaID)} />}
			{error ? <ErrorMessage error={error} /> : <Gallery restaurants={restaurants} onMediaSelection={setSelectedMediaID} isLikedMedia={isLikedMedia} searching={searching} showLiked={showLiked} />}
		</div>
	);
}

export default App;
