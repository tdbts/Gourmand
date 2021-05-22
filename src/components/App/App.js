import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import constants from "../../constants/constants";
import yelpConstants from "../../scrapers/yelp/constants";
import Lookup from '../../lookup/Lookup';
import StorageFactory from '../../storage/StorageFactory';
import LikedMedia from '../../user/LikedMedia';
import EventTracker from "../../tracking/EventTracker";
import ReactGA from 'react-ga';
import urlWithSearchParams from '../../search/urlWithSearchParams';
import Header from './Header/Header';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults';
import About from './About/About';
import Contact from './Contact/Contact';
import Login from './Login/Login';
import Restaurant from "./Restaurant/Restaurant";
import SignUp from "./SignUp/SignUp";
import Footer from "./Footer/Footer";
import Upload from "./Upload/Upload";
import Map from "./Map/Map";
import Profile from "./Profile/Profile";
import scrollToTop from "../utils/scrollToTop";
import {useAuth} from "../utils/auth/useAuth";
import withIDFromURL from "../utils/withIDFromURL/withIDFromURL";
import MediaModal from "./MediaModal/MediaModal";

const { EVENT_TRACKING_TOKEN, GOOGLE_ANALYTICS_ID } = constants;
const { distances } = yelpConstants;
const lookup = new Lookup();
const storage = new StorageFactory().get(window.localStorage);
const likedMedia = new LikedMedia(getLikedMedia(storage));
const eventTracker = new EventTracker(EVENT_TRACKING_TOKEN);
const { events } = constants;
const RestaurantPage = withIDFromURL(Restaurant);

eventTracker.track(events.PAGE_VISIT, { pathname: window.location.pathname });

function getLikedMedia(storage) {
	try {
		return storage.get('likedMedia');
	} catch (e) {
		window.console.debug(e);
	}
}

const isLikedMedia = (auth, lookup) => (id) => {
	const { likedMedia } = auth.getUser();
	return id && likedMedia.isLiked(lookup.getRestaurantIDByMediaID(id), id);
};

function toggleLikedMedia(id, auth, setLikedMediaJSON) {
	const { LIKE_MEDIA, UNLIKE_MEDIA } = events;
	const { likedMedia } = auth.getUser();
	const restaurantID = lookup.getRestaurantIDByMediaID(id);
	const likedState = likedMedia.toggle(restaurantID, id);
	eventTracker.track(likedState ? LIKE_MEDIA : UNLIKE_MEDIA);
	storage.set('likedMedia', likedMedia.serialize());
	setLikedMediaJSON(likedMedia.getAll());

	if (auth.isAuthenticated()) {
		if (likedState) {
			auth.like({[restaurantID]: [id]})
				.catch(e => console.error(e));
		} else {
			auth.unlike({[restaurantID]: [id]})
				.catch(e => console.error(e));
		}
	}
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

function checkSearchJSONForErrors(restaurants) {
	const hasMedia = restaurants.some(restaurant => restaurant.mediaCount > 0);

	if (hasMedia) {
		return restaurants;
	}

	throw new Error("Nothing to see here.");
}

function getRestaurantJSON(url) {
	return fetch(url)
		.then(checkResponseForErrors)
		.then(convertResponseToJSON)
		.then(checkSearchJSONForErrors);
}

function convertResponseToJSON(response) {
	return response.text()
		.then(text => {
			// console.log("Restaurant JSON (text):", text);
			return JSON.parse(text);
		});
}

function getRestaurantDataByID(id) {
	let restaurant = lookup.getRestaurantByID(id);

	// TODO: Get restaurant data remotely
	if (restaurant)
		return Promise.resolve(restaurant);

	console.warn(`Restaurant data not in lookup: ${id}`);
	const url = `/restaurant-lookup?id=${id}`;
	return fetch(url)
		.then(checkResponseForErrors)
		.then(convertResponseToJSON)
		.then(restaurant => {
			if (!restaurant) {
				throw new Error("Could not find that restaurant.");
			}

			// Update expects an array of restaurants
			lookup.update(url, [restaurant]);
			return restaurant;
		});
}

function onError(e, setError, eventTracker) {
	window.console.error(e);
	eventTracker.track(events.ERROR, { message: e.message });
	setError(e);
}

const onRestaurantLinkClick = (setSelectedMediaID) => () => {
	eventTracker.track(events.OPEN_RESTAURANT_PAGE);
	setSelectedMediaID('');
	scrollToTop();
}

const onDistanceDropdownClick = setDistance => distance => {
	setDistance(distance);
};

const onShowLikedChange = setShowLiked => showLiked => {
	const { SHOW_LIKED_MEDIA, SHOW_ALL_MEDIA } = events;
	eventTracker.track(showLiked ? SHOW_LIKED_MEDIA : SHOW_ALL_MEDIA);
	setShowLiked(showLiked);
};

const getInitialSearchState = (param, fallback, browserLocation) => {
	return new URLSearchParams(browserLocation.search).get(param) || fallback;
};

const isGalleryPage = pathname => pathname.startsWith('/gallery');
const isHomePage = pathname => pathname === '/';

function App() {
	const history = useHistory();
	const browserLocation = useLocation();
	const auth = useAuth();

	const [loggedIn, setLoggedIn] = useState(false);
	const [restaurants, setRestaurants] = useState([]);
	const [ canRenderSignUpButton, setCanRenderSignUpButton ] = useState(false);
	// Used solely to re-render components on changes
	const [likedMediaJSON, setLikedMediaJSON] = useState({});
	const [openedHeader, setOpenedHeader] = useState(false);
	const [description, setDescription] = useState(getInitialSearchState("description", "", browserLocation));
	const [location, setLocation] = useState(getInitialSearchState("location", '', browserLocation));
	const [distance, setDistance] = useState(getInitialSearchState("distance", distances.UNKNOWN, browserLocation));
	const [requestingLocation, setRequestingLocation] = useState(false);
	const [selectedMediaID, setSelectedMediaID] = useState('');
	const [searching, setSearching] = useState(false);
	const [error, setError] = useState(null);
	const [showLiked, setShowLiked] = useState(false);

    console.log("browserLocation:", browserLocation);
    const { pathname, search } = browserLocation;
    const lookupKey = pathname + search;

    // Check authentication status once on initial render
    useEffect(() => {
    	// Set liked media for null user before rendering any children
		auth.getUser().setLikedMedia(likedMedia);

    	auth.authenticate()
			.then(() => {
				if (auth.isAuthenticated()) {
					console.log(`Welcome back, ${auth.getUser().getUsername()}!`);
				} else {
					console.log("New user.");
					console.log(auth.getUser());
					setCanRenderSignUpButton(true);
				}
			})
	}, []);

    useEffect(() => {
    	if (setLoggedIn !== auth.isAuthenticated()) {
			setLoggedIn(auth.isAuthenticated());
		}
	}, []);

	// console.log("selectedMediaID:", selectedMediaID);
	useEffect(() => {
        setError(null);

        if (!isGalleryPage(pathname) && !isHomePage(pathname))
            return;

        const cachedRestaurants = lookup.getRestaurantsByURL(lookupKey);

        if (cachedRestaurants) {
            setRestaurants(cachedRestaurants);
            scrollToTop();
        } else if (search) {
            setSearching(true);
            eventTracker.track(events.SEARCH, { description, location, distance });

            const searchURL = urlWithSearchParams('/search', {description, location, distance});

            getRestaurantJSON(searchURL)
                .then(json => {
                    lookup.update(lookupKey, json);
                    console.log("lookup:", lookup);
                    setRestaurants(json);
                    setSearching(false);
                    scrollToTop();
                })
                .catch(e => onError(e, setError, eventTracker));
		} else if (pathname === '/') {
			getRestaurantJSON('./home-page-restaurants.json')
				.then(json => {
					lookup.update(lookupKey, json);
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
			eventTracker.track(events.REQUEST_CURRENT_LOCATION);
		}
	}, [requestingLocation]);

	useEffect(() => {
		if (selectedMediaID) {
			eventTracker.track(events.CLICK_GALLERY_MEDIA);
		}
	}, [selectedMediaID]);

	// Initialize Google Analytics page view tracking
	if (GOOGLE_ANALYTICS_ID) {
		window.console.log("Initializing Google Analytics.");

		history.listen(location => {
			ReactGA.initialize(GOOGLE_ANALYTICS_ID);
			ReactGA.set({ page: location.pathname });
			ReactGA.pageview(location.pathname);
		});
	}

	const headerProps = {
		loggedIn,
		openedHeader,
		setOpenedHeader,
		canRenderSignUpButton,
		description,
		setDescription,
		location,
		setLocation,
		requestingLocation,
		setRequestingLocation,
		distance,
		onDistanceDropdownClick: onDistanceDropdownClick(setDistance),
		onShowLikedChange: onShowLikedChange(setShowLiked),
		onSearchRequest: () => updateSearchURL({description, location, distance}, history)
	};

	const mediaModalProps = {
		isAuthenticated: auth.isAuthenticated(),
		selected: getSelectedMediaInfo(selectedMediaID, lookup),
		onMediaLikeToggle: (id) => toggleLikedMedia(id, auth, setLikedMediaJSON),
		onRestaurantLinkClick: onRestaurantLinkClick(setSelectedMediaID),
		onClose: () => setSelectedMediaID(''),
		isLiked: isLikedMedia(auth, lookup)(selectedMediaID)
	};

	const galleryProps = {
		isAuthenticated: auth.isAuthenticated(),
		isLikedMedia: isLikedMedia(auth, lookup),
		searching,
		showLiked,
		restaurants,
		onMediaSelection: setSelectedMediaID
	};

	const restaurantProps = {
		getRestaurantDataByID,
		isLikedMedia,
		galleryProps
	};

	const searchResultsProps = {
		error,
		galleryProps,
		restaurantProps
	};

	return (
		<div className="app">
			<Header {...headerProps} />
			<Switch>
				<Route exact path={'/'}>
					<Home {...galleryProps} restaurants={lookup.getRestaurantsByURL(lookupKey) || []} />
				</Route>
				<Route path={'/gallery'}>
					<SearchResults {...searchResultsProps} />
				</Route>
				<Route path={'/about'}>
					<About />
				</Route>
				<Route path={'/contact'}>
					<Contact />
				</Route>
				<Route path={'/user/login'}>
					<Login />
				</Route>
				<Route path={'/restaurant/:id'}>
					<RestaurantPage {...restaurantProps} />
				</Route>
				<Route path={'/user/signup'}>
					<SignUp />
				</Route>
				<Route path={'/upload'}>
					<Upload />
				</Route>
				<Route path={'/map'}>
					<Map />
				</Route>
				<Route path={'/user/profile'}>
					<Profile />
				</Route>
			</Switch>
			{ selectedMediaID && <MediaModal {...mediaModalProps} /> }
			<Footer {...{openedHeader, setOpenedHeader}} />
		</div>
	);
}

export default App;
