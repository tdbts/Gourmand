import { useState } from 'react';
import { Container, Row, Col, Nav, Form, InputGroup, InputGroupAddon, Input, Button, Spinner } from 'reactstrap';
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
			<Container className="input-container px-0">
				<Row>
					<Col className="description-input-column" xs="12" md="4">
						<Nav className="navbar-light">
							<div className="input-group-container">
								<InputGroup>
									<InputGroupAddon addonType="prepend">
										<img className="input-icon search-icon" src="magnifying-glass.svg" />
									</InputGroupAddon>
									<Input className="search-input" type="text" value={description} onChange={onDescriptionChange} placeholder="e.g. Pizza" />
								</InputGroup>
							</div>
						</Nav>
					</Col>
					<Col xs="12" md="8">
						<Nav className="navbar-light">
							<div className="input-group-container">
								<InputGroup>
									<InputGroupAddon addonType="prepend">
										<img className="input-icon location-icon" src="target.svg" />
									</InputGroupAddon>
									<Input className="search-input" type="text" value={location} onChange={onLocationChange} onClick={toggleSuggestions}
										onBlur={hideSuggestions} placeholder="e.g. Brooklyn, NY 11237" />
									<Button className="search-button" color="outline-success" type="submit">
										{searching ? <Spinner color="dark" size="sm" /> : "Search"}
									</Button>
								</InputGroup>
								{suggestionsOpen && <Suggestions requestLocation={requestLocation} />}
							</div>
						</Nav>
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
