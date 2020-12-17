import { useState } from 'react';

function SearchForm({onSearchRequest}) {
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');

	const onDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const onLocationChange = (event) => {
		setLocation(event.target.value);
	};

	return (
		<form className="search-form" onSubmit={(e) => onSubmit(e, onSearchRequest)}>
			<label className="search-label">
				Description:
				<input className="search-input" type="text" value={description} onChange={onDescriptionChange} placeholder="e.g. Pizza" />
			</label>
			<label className="search-label">
				Location:
				<input className="search-input" type="text" value={location} onChange={onLocationChange} placeholder="e.g. Brooklyn, NY 11237" />
			</label>
			<input className="search-input btn btn-primary btn-sm" type="submit" value="Submit" />
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
