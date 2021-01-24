const GalleryMedia = ({ media, onMediaSelection, isLiked }) => {
	return (
		<div className="food-media-container">
			<img className="food-media thumbnail" src={media.getThumbnailURLs()[0]} onClick={() => onMediaSelection(media.id)} />
		</div>
	);
};

export default GalleryMedia;
