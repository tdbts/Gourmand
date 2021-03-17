import './App.css';
import { useState, useEffect } from 'react';
import constants from '../../scrapers/yelp/constants';
import Header from './Header/Header';
import Gallery from './SearchResults/Gallery/Gallery';
import ErrorMessage from './SearchResults/ErrorMessage/ErrorMessage';
import MediaModal from './MediaModal/MediaModal';
import Lookup from '../../lookup/Lookup';
import StorageFactory from '../../storage/StorageFactory';
import LikedMedia from '../../user/LikedMedia';
import formatSearchURL from '../../search/formatSearchURL';
import SearchResults from "./SearchResults/SearchResults";

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

function updateSearchURL({description, location, distance}, setURL) {
	console.log("updateSearchURL()");
	console.log("description:", description);
	console.log("location:", location);
	console.log("distance:", distance);

	if (!location)
		return;

	const url = formatSearchURL('/search', {description, location, distance});
	console.log("url:", url);
	return setURL(url);
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

	throw new Error(response.statusText);
}

function checkJSONForErrors(restaurants) {
	const hasMedia = restaurants.some(restaurant => restaurant.mediaCount > 0);

	if (hasMedia) {
		return restaurants;
	}

	throw new Error("Nothing to see here.");
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
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [requestingLocation, setRequestingLocation] = useState(false);
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
				.then(checkJSONForErrors)
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

	useEffect(() => {
		updateSearchURL({description, location, distance}, setURL);
	}, [distance]);

	const headerProps = {
		description,
		setDescription,
		location,
		setLocation,
		requestingLocation,
		setRequestingLocation,
		setShowLiked,
		distance,
		setDistance,
		onSearchRequest: () => updateSearchURL({description, location, distance}, setURL)
	};

	const mediaModalProps = {
		selected: getSelectedMediaInfo(selectedMediaID, lookup),
		onMediaLikeToggle: (id) => toggleLikedMedia(id, setLikedMedia),
		onClose: () => setSelectedMediaID(''),
		isLiked: isLikedMedia(selectedMediaID)
	};

	const searchResultsProps = {
		error,
		restaurants,
		isLikedMedia,
		searching,
		showLiked,
		onMediaSelection: setSelectedMediaID
	};

	return (
		<div className="app">
			<Header {...headerProps} />
			{selectedMediaID && <MediaModal {...mediaModalProps} />}
			<SearchResults {...searchResultsProps} />
		</div>
	);
}

export default App;
