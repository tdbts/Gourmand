import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import getUnlikedMediaIcon from '../../utils/getUnlikedMediaIcon';
import getLikedMediaIcon from '../../utils/getLikedMediaIcon';

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

function MediaModal({selected, onMediaLikeToggle, onClose, isLiked}) {
	console.log("selected:", selected);
	const {media, restaurant} = selected;
	const {source, caption} = media;
	const {name, address, neighborhoods, categories, rating} = restaurant;
	const onIconClick = () => onMediaLikeToggle(media.id);

	return (
		<Modal isOpen={!!selected} toggle={onClose} className="media-modal-container">
			<ModalHeader toggle={onClose}>
				<div className="caption">{formatCaption(caption)}</div>
			</ModalHeader>
			<ModalBody>
				<div className="modal-info-container">
					<div className="modal-image-container">
						<img className="food-media modal-image" src={source} />
						{ isLiked ? getLikedMediaIcon("32", "32", "white", onIconClick) : getUnlikedMediaIcon("32", "32", "white", onIconClick) }
					</div>
					<div className="restaurant-details-container">
						{name && <div className="restaurant-name">{name}</div>}
						{address && <a onClick={e => onAddressClick(e, address)} className="restaurant-address">{address.join(" ")}</a>}
						{neighborhoods && <div className="restaurant-neighborhoods">{neighborhoods.join(", ")}</div>}
						{categories && <div className="restaurant-categories">{categories.join(", ")}</div>}
						{rating && <div className="restaurant-rating">{rating}</div>}
					</div>
					
				</div>
	        </ModalBody>
	        <ModalFooter>
				<Button color="secondary" onClick={onClose}>Close</Button>
			</ModalFooter>
		</Modal>
	);
}

export default MediaModal;
