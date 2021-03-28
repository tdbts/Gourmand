import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import constants from "../../constants/constants";
import yelpConstants from "../../scrapers/yelp/constants";
import Lookup from '../../lookup/Lookup';
import StorageFactory from '../../storage/StorageFactory';
import LikedMedia from '../../user/LikedMedia';
import EventTracker from "../../tracking/EventTracker";
import urlWithSearchParams from '../../search/urlWithSearchParams';
import Header from './Header/Header';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults';
import About from './About/About';
import Contact from './Contact/Contact';
import Login from './Login/Login';
import scrollToTop from "../utils/scrollToTop";
import trackedLink from "../../utils/trackedLink";

const { EVENT_TRACKING_TOKEN } = constants;
const { distances } = yelpConstants;
const lookup = new Lookup();
const storage = new StorageFactory().get(window.localStorage);
const likedMedia = new LikedMedia(getLikedMedia(storage), storage);
const eventTracker = new EventTracker(
	EVENT_TRACKING_TOKEN,
	[
		trackedLink('#home-link', EventTracker.events.NAVIGATE, '/'),
		trackedLink('#about-link', EventTracker.events.NAVIGATE, '/about'),
		trackedLink('#contact-link', EventTracker.events.NAVIGATE, '/contact'),
		trackedLink('#login-link', EventTracker.events.NAVIGATE, '/login'),
		trackedLink('.restaurant-address', EventTracker.events.OPEN_MAP)
	]);

eventTracker.track(EventTracker.events.PAGE_VISIT);

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
	const { LIKE_MEDIA, UNLIKE_MEDIA } = EventTracker.events;
	const newLikedState = likedMedia.toggle(lookup.getRestaurantIDByMediaID(id), id);
	eventTracker.track(newLikedState ? LIKE_MEDIA : UNLIKE_MEDIA);
	setLikedMedia(likedMedia.getAll());
}

function updateSearchURL({description, location, distance}, history) {
	console.log("updateSearchURL()");
	console.log("description:", description);
	console.log("location:", location);
	console.log("distance:", distance);

	if (!location)
		return;

	const url = urlWithSearchParams('/gallery', {description, location, distance});
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

function getRestaurantJSON(url) {
	return fetch(url)
		.then(checkResponseForErrors)
		.then(response => response.text())
		.then(text => {
			// console.log("Restaurant JSON (text):", text);
			return JSON.parse(text);
		})
		.then(checkJSONForErrors);
}

function onError(e, setError, eventTracker) {
	window.console.error(e);
	eventTracker.track(EventTracker.events.ERROR, { message: e.message });
	setError(e);
}

function onNavLinkClick(pathname) {
	eventTracker.track(EventTracker.events.NAVIGATE, { pathname });
}

const onDistanceDropdownClick = setDistance => distance => {
	setDistance(distance);
};

const onShowLikedChange = setShowLiked => showLiked => {
	const { SHOW_LIKED_MEDIA, SHOW_ALL_MEDIA } = EventTracker.events;
	eventTracker.track(showLiked ? SHOW_LIKED_MEDIA : SHOW_ALL_MEDIA);
	setShowLiked(showLiked);
};

function App() {
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
		console.log("browserLocation:", browserLocation);
		const { pathname, search } = browserLocation;

		if (search) {
			setError(null);
			setSearching(true);
			eventTracker.track(EventTracker.events.SEARCH, { description, location, distance });

			const searchURL = urlWithSearchParams('/search', {description, location, distance});

			getRestaurantJSON(searchURL)
				.then(json => {
					lookup.update(pathname + search, json);
					console.log("lookup:", lookup);
					setRestaurants(json);
					setSearching(false);
					scrollToTop();
				})
				.catch(e => onError(e, setError, eventTracker));
		} else if (pathname === '/') {
			getRestaurantJSON('./home-page-restaurants.json')
				.then(json => {
					lookup.update(pathname + search, json);
					setRestaurants(json);
				})
				.catch(e => onError(e, setError, eventTracker));
		}
	}, [browserLocation]);

	useEffect(() => {
		updateSearchURL({description, location, distance}, history);
	}, [distance]);

	useEffect(() => {
		if (requestingLocation) {
			eventTracker.track(EventTracker.events.REQUEST_CURRENT_LOCATION);
		}
	}, [requestingLocation]);

	useEffect(() => {
		if (selectedMediaID) {
			eventTracker.track(EventTracker.events.CLICK_GALLERY_MEDIA);
		}
	}, [selectedMediaID]);

	const headerProps = {
		description,
		setDescription,
		location,
		setLocation,
		requestingLocation,
		setRequestingLocation,
		setShowLiked,
		distance,
		onNavLinkClick,
		onDistanceDropdownClick: onDistanceDropdownClick(setDistance),
		onShowLikedChange: onShowLikedChange(setShowLiked),
		onSearchRequest: () => updateSearchURL({description, location, distance}, history)
	};

	const mediaModalProps = {
		selected: getSelectedMediaInfo(selectedMediaID, lookup),
		onMediaLikeToggle: (id) => toggleLikedMedia(id, setLikedMedia),
		onClose: () => setSelectedMediaID(''),
		isLiked: isLikedMedia(selectedMediaID)
	};

	const galleryProps = {
		isLikedMedia,
		searching,
		showLiked,
		selectedMediaID,
		restaurants: lookup.getRestaurantsByURL(browserLocation.pathname + browserLocation.search) || restaurants,
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
				<Route path={'/gallery'}>
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
