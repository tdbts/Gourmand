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
		<form onSubmit={(e) => onSubmit(e, onSearchRequest)}>
			<label>
				Description:
				<input type="text" value={description} onChange={onDescriptionChange} />
			</label>
			<label>
				Location:
				<input type="text" value={location} onChange={onLocationChange} />
			</label>
			<input type="submit" value="Submit" />
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
