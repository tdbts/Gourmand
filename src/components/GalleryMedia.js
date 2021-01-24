const GalleryMedia = ({ media, onMediaSelection, onMediaLikeToggle, isLiked = true }) => {
	return (
		<div className="food-thumbnail-container">
			<img className="food-thumbnail" src={media.getThumbnailURLs()[0]} onClick={() => onMediaSelection(media.id)} />
			{ isLiked && getIconSVG("16", "16", "white") }
		</div>
	);
};

function getIconSVG(width, height, color) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} class="liked-media-icon" viewBox="0 0 16 16">
		  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
		</svg>
	);
}

export default GalleryMedia;
