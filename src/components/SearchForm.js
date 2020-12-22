import { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Suggestions from './Suggestions';

function SearchForm({onSearchRequest}) {
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
  	
  	const requestLocation = () => {
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
			<Container className="input-container px-0">
				<Row>
					<Col xs="3">
						<p>Description:</p>
					</Col>
					<Col>
						<input className="search-input" type="text" value={description} onChange={onDescriptionChange} placeholder="e.g. Pizza" />
					</Col>
				</Row>	
				<Row>
					<Col xs="3">
						<p>Location:</p>
					</Col>
					<Col>
						<input className="search-input" type="text" value={location} onChange={onLocationChange} onClick={toggleSuggestions}
							onBlur={hideSuggestions} placeholder="e.g. Brooklyn, NY 11237" />
						{suggestionsOpen && <Suggestions requestLocation={requestLocation} />}
					</Col>
					<Col className="search-button-container">
						<input className="search-input btn btn-primary btn-sm" type="submit" value="Search" />
					</Col>
				</Row>	
			</Container>
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
