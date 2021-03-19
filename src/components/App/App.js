import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import constants from '../../scrapers/yelp/constants';
import Lookup from '../../lookup/Lookup';
import StorageFactory from '../../storage/StorageFactory';
import LikedMedia from '../../user/LikedMedia';
import formatSearchURL from '../../search/formatSearchURL';
import Header from './Header/Header';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults';
import About from './About/About';
import Contact from './Contact/Contact';
import Login from './Login/Login';

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

function updateSearchURL({description, location, distance}, history) {
	console.log("updateSearchURL()");
	console.log("description:", description);
	console.log("location:", location);
	console.log("distance:", distance);

	if (!location)
		return;

	const url = formatSearchURL('/search', {description, location, distance});
	console.log("url:", url);
	return history.push(url);
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

function getRestaurantJSON(url) {
	return fetch(url)
		.then(checkResponseForErrors)
		.then(response => response.json())
		.then(checkJSONForErrors);
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
	const history = useHistory();
	const browserLocation = useLocation();

	// console.log("selectedMediaID:", selectedMediaID);
	useEffect(() => {
		if (browserLocation.search) {
			console.log("Making request:", url);
			setError(null);
			setSearching(true);

			getRestaurantJSON(url)
				.then(json => {
					lookup.update(json);
					console.log("lookup:", lookup);
					setRestaurants(json);
					setSearching(false);
					scrollToTop();
				})
				.catch(e => setError(e));
		} else if (browserLocation.pathname === '/') {
			getRestaurantJSON('./home-page-restaurants.json')
				.then(json => {
					lookup.update(json);
					setRestaurants(json);
				});
		}
	}, [browserLocation])

	useEffect(() => {
		updateSearchURL({description, location, distance}, history);
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
		onSearchRequest: () => updateSearchURL({description, location, distance}, history)
	};

	const mediaModalProps = {
		selected: getSelectedMediaInfo(selectedMediaID, lookup),
		onMediaLikeToggle: (id) => toggleLikedMedia(id, setLikedMedia),
		onClose: () => setSelectedMediaID(''),
		isLiked: isLikedMedia(selectedMediaID)
	};

	const galleryProps = {
		restaurants,
		isLikedMedia,
		searching,
		showLiked,
		selectedMediaID,
		onMediaSelection: setSelectedMediaID
	};

	const searchResultsProps = {
		error,
		...galleryProps
	};

	return (
		<div className="app">
			<Header {...headerProps} />
			<Switch>
				<Route exact path={'/'}>
					<Home {...galleryProps} mediaModalProps={mediaModalProps} />
				</Route>
				<Route path={'/search'}>
					<SearchResults {...searchResultsProps} mediaModalProps={mediaModalProps} />
				</Route>
				<Route path={'/about'}>
					<About />
				</Route>
				<Route path={'/contact'}>
					<Contact />
				</Route>
				<Route path={'/login'}>
					<Login />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
