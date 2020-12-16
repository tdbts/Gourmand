import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function formatCaption(caption) {
	return caption ? `"${caption}"` : "[ No Caption ]";
}

function onAddressClick(e, address) {
	e.preventDefault();
	openInNewTab(formatMapLink(address));
}

function openInNewTab(url) {
	const win = window.open(url, '_blank');
	win.focus();
}

function formatMapLink(address) {
	return "https://www.google.com/maps/place/" + address.join(" ").replace(" ", "+");
}

function MediaModal({selected, onClose}) {
	console.log("selected:", selected);
	const {media, restaurant} = selected;
	const {source, caption} = media;
	const {name, address, neighborhoods, categories, rating} = restaurant;

	return (
		<Modal isOpen={!!selected} toggle={onClose} className="media-modal-container">
			<ModalHeader toggle={onClose}>
				<div className="caption">{formatCaption(caption)}</div>
			</ModalHeader>
			<ModalBody>
				<div className="modal-info-container">
					<img className="food-media modal-image" src={source} />
					{name && <div className="restaurant-name">{name}</div>}
					{address && <a onClick={e => onAddressClick(e, address)} className="restaurant-address">{address.join(" ")}</a>}
					{neighborhoods && <div className="restaurant-neighborhoods">{neighborhoods.join(", ")}</div>}
					{categories && <div className="restaurant-categories">{categories.join(", ")}</div>}
					{rating && <div className="restaurant-rating">{rating}</div>}
				</div>
	        </ModalBody>
	        <ModalFooter>
				<Button color="secondary" onClick={onClose}>Close</Button>
			</ModalFooter>
		</Modal>
	);
}

export default MediaModal;
