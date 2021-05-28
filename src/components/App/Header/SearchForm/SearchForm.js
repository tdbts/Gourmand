import './SearchForm.css';
import { useState, useEffect } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import Suggestions from './Suggestions/Suggestions';
import LocationRequestErrorModal from "./LocationRequestErrorModal/LocationRequestErrorModal";

function SearchForm({onSearchRequest, description, setDescription, location, setLocation, requestingLocation, setRequestingLocation}) {
	const [suggestionsOpen, setSuggestionsOpen] = useState(false);
	const [locationRequestError, setLocationRequestError] = useState(false);
	const [indicateError, setIndicateError] = useState(false);

	useEffect(() => {
		setIndicateError(!!locationRequestError);
	}, [locationRequestError]);

	const onDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const onLocationChange = (event) => {
		const location = event.target.value;

		if (indicateError) {
			setIndicateError(false);
		}

		if (location) {
			hideSuggestions();
		}

		setLocation(location);
	};
  	
  	const toggleSuggestions = () => setSuggestionsOpen(prevState => !prevState);
  	const hideSuggestions = () => setSuggestionsOpen(false);
  	const getLocationIconSource = (requestingLocation) => requestingLocation ? "/spinner.png" : "/target.svg";
  	
  	const requestLocation = (e) => {
  		// Prevent page refresh
  		e.preventDefault();
  		console.log("Requesting location.");
  		setRequestingLocation(true);
		hideSuggestions();
  		navigator.geolocation.getCurrentPosition(
			e => {
				const { latitude, longitude } = e.coords;
				setRequestingLocation(false);
				setLocationRequestError(false);
				setLocation(`${latitude.toPrecision(7)}, ${longitude.toPrecision(7)}`);
			},
			e => {
				setRequestingLocation(false);
				setLocationRequestError(true);
				console.error(e);
			},
			{timeout: 10 * 1000, maximumAge: 60 * 1000});
	};

	return (
		<form className="search-form" onSubmit={(e) => onSubmit(e, onSearchRequest)}>
			<div className="input-group-container">
				<InputGroup>
					<InputGroupAddon addonType="prepend">
						<img className="input-icon query-icon" src="/magnifying-glass.svg" />
					</InputGroupAddon>
					<Input className="search-input description-input" type="text" value={description} onChange={onDescriptionChange} placeholder="e.g. Pizza" />
				</InputGroup>
			</div>
			<div className="input-group-container">
				<InputGroup>
					<InputGroupAddon addonType="prepend">
						<img className={`input-icon location-icon ${requestingLocation ? "rotate" : ""}`} src={getLocationIconSource(requestingLocation)} />
					</InputGroupAddon>
					<Input className={getSearchInputClassName(indicateError)} type="text" value={location} onChange={onLocationChange} onClick={toggleSuggestions}
						onBlur={hideSuggestions} placeholder="e.g. Brooklyn, NY 11237" />
				</InputGroup>
				{suggestionsOpen && <Suggestions requestLocation={requestLocation} />}
				<LocationRequestErrorModal isOpen={locationRequestError} toggle={() => setLocationRequestError(!locationRequestError)} />
			</div>
			<Button className="search-submit-button hidden-submit" type="submit" />
		</form>
	);
}

function onSubmit(e, onSearchRequest) {
	e.preventDefault();
	console.log("onSubmit()");
	onSearchRequest();
}

function getSearchInputClassName(indicateError) {
	return ['search-input', 'location-input', indicateError ? 'error' : ""].join(" ").trim();
}

export default SearchForm;
