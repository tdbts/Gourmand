import { useState } from 'react';
import { Container, Row, Col, Nav, NavItem, Form, InputGroup, InputGroupAddon, Input, Button, Spinner } from 'reactstrap';
import Suggestions from './Suggestions';

function SearchForm({onSearchRequest, searching}) {
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [suggestionsOpen, setSuggestionsOpen] = useState(false);

	const onDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const onLocationChange = (event) => {
		setLocation(event.target.value);
	};
  	
  	const toggleSuggestions = () => setSuggestionsOpen(prevState => !prevState);
  	const hideSuggestions = () => setSuggestionsOpen(false);
  	
  	const requestLocation = (e) => {
  		// Prevent page refresh
  		e.preventDefault();
  		console.log("Requesting location.");
		navigator.geolocation.getCurrentPosition(
			e => {
				const { latitude, longitude } = e.coords;
				setLocation(`${latitude.toPrecision(7)}, ${longitude.toPrecision(7)}`);
				hideSuggestions();
			}, 
			e => console.error(e));
	};

	return (
		<form className="search-form" onSubmit={(e) => onSubmit(e, onSearchRequest)}>
			<div className="input-group-container">
				<InputGroup>
					<InputGroupAddon addonType="prepend">
						<img className="input-icon search-icon" src="magnifying-glass.svg" />
					</InputGroupAddon>
					<Input className="search-input" type="text" value={description} onChange={onDescriptionChange} placeholder="e.g. Pizza" />
				</InputGroup>
			</div>
			<div className="input-group-container">
				<InputGroup>
					<InputGroupAddon addonType="prepend">
						<img className="input-icon location-icon" src="target.svg" />
					</InputGroupAddon>
					<Input className="search-input" type="text" value={location} onChange={onLocationChange} onClick={toggleSuggestions}
						onBlur={hideSuggestions} placeholder="e.g. Brooklyn, NY 11237" />
				</InputGroup>
				{suggestionsOpen && <Suggestions requestLocation={requestLocation} />}
			</div>
			<Button className="search-submit-button" type="submit"></Button>
		</form>
	);
}

function onSubmit(e, onSearchRequest) {
	e.preventDefault();
	console.log("onSubmit()");
	console.log("e:", e);
	const [descriptionInput, locationInput] = e.target;
	onSearchRequest(descriptionInput.value, locationInput.value);
}

export default SearchForm;
