import './GalleryMedia.css';
import getLikedMediaIcon from '../../../utils/getLikedMediaIcon';

const delays = [50, 250, 500, 750, 1000];

const GalleryMedia = ({ media, onMediaSelection, isLiked, searching }) => {
	const delayIndex = Math.floor(Math.random() * delays.length);
	const delay = delays[delayIndex];
	return (
		<div className={`food-thumbnail-container transition-delay-${delay}`}>
			<img className="food-thumbnail" src={media.getThumbnailURLs()[0]} onClick={() => onMediaSelection(media.id)} />
			{ isLiked && getLikedMediaIcon("16", "16", "white", "liked-media-icon") }
		</div>
	);
};

export default GalleryMedia;
