import './Suggestions.css';
import { ListGroup, ListGroupItem } from 'reactstrap';

/*
 The parent search form hides suggestions on blur events from the location input, removing this component from the DOM before the click handler of this component can fire.  To mitigate, prevent default on mousedown.
*/
function Suggestions({requestLocation}) {
	return  (
		<ListGroup className="suggestions-list-group" onMouseDown={e => e.preventDefault()}>
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