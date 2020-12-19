import { ListGroup, ListGroupItem } from 'reactstrap';

function Suggestions({requestLocation}) {
	return  (
		<ListGroup className="suggestions-list-group">
			<ListGroupItem tag="button" onClick={requestLocation} action>
				<div className="current-location-container">
					<img className="current-location-icon" src="cursor-fill.svg" />
					<span>Current Location</span>
				</div>
			</ListGroupItem>
		</ListGroup>
	);
}

export default Suggestions;