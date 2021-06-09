import './MediaModal.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MapLink from "../common/MapLink/MapLink";
import getUnlikedMediaIcon from '../../utils/getUnlikedMediaIcon';
import getLikedMediaIcon from '../../utils/getLikedMediaIcon';
import { useDoubleTap } from "use-double-tap";
import { Link } from "react-router-dom";
import withLoginRedirect from "../../utils/withLoginRedirect/withLoginRedirect";

const formatCaption = (caption) => {
	return caption ? `"${caption}"` : "[ No Caption ]";
};

const MediaModal = ({ selected, onMediaLikeToggle, onRestaurantLinkClick, onClose, isLiked, redirectIfUnauthenticated }) => {
	const {media, restaurant} = selected;
	const {source, caption} = media;
	const {name, address, neighborhoods, categories, rating} = restaurant;
	const onIconClick = redirectIfUnauthenticated(() => onMediaLikeToggle(media.id));
	const mobileDoubleClickHandler = useDoubleTap(onIconClick);

	return (
		<Modal isOpen={!!selected} toggle={onClose} className="media-modal-container">
			<ModalHeader toggle={onClose}>
				<div className="caption">{formatCaption(caption)}</div>
			</ModalHeader>
			<ModalBody>
				<div className="modal-info-container">
					<div className="modal-image-container">
						<img className="food-media modal-image" src={source}  onDoubleClick={onIconClick} {...mobileDoubleClickHandler} />
						{ isLiked ? getLikedMediaIcon("32", "32", "white", "liked-media-icon", onIconClick) : getUnlikedMediaIcon("32", "32", "white", "unliked-media-icon", onIconClick) }
					</div>
					<div className="restaurant-details-container">
						{name && <Link className="restaurant-name" to={`/restaurant/${restaurant.id}`} onClick={onRestaurantLinkClick}><div>{name}</div></Link>}
						{address && <MapLink className="restaurant-address" address={address} />}
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
};

export default withLoginRedirect(MediaModal);
