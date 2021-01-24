import getLikedMediaIcon from './utils/getLikedMediaIcon';

const GalleryMedia = ({ media, onMediaSelection, isLiked }) => {
	return (
		<div className="food-thumbnail-container">
			<img className="food-thumbnail" src={media.getThumbnailURLs()[0]} onClick={() => onMediaSelection(media.id)} />
			{ isLiked && getLikedMediaIcon("16", "16", "white") }
		</div>
	);
};

export default GalleryMedia;
