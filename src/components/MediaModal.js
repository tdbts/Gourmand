function MediaModal({selected, onClose}) {
	console.log("selected:", selected);
	const {media, restaurant} = selected;
	const {source, caption} = media;
	const {name, address, neighborhoods, categories, rating} = restaurant;

	return (
		<div className="media-modal-container">
			<img className="food-media modal-image" src={source} />
			{caption && <div className="caption">{`"${caption}"`}</div>}
			{name && <div className="restaurant-name">{name}</div>}
			{address && <div className="restaurant-address">{address.join(" ")}</div>}
			{neighborhoods && <div className="restaurant-neighborhoods">{neighborhoods.join(", ")}</div>}
			{categories && <div className="restaurant-categories">{categories.join(", ")}</div>}
			{rating && <div className="restaurant-rating">{rating}</div>}
		</div>
	);
}

export default MediaModal;
