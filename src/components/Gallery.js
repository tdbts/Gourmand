import { useState, useEffect } from 'react';
import _ from 'underscore';
import YelpMedia from '../scrapers/yelp/YelpMedia';
import GalleryMedia from './GalleryMedia';

const Gallery = ({restaurants, onMediaSelection, onMediaLikeToggle, isLikedMedia}) => {
	// console.log("media:", media);
	const [shuffledMedia, setShuffledMedia] = useState([]);

	useEffect(() => {
		setShuffledMedia(getShuffledMedia(restaurants));
	}, [restaurants]);

	return (
		<div className="gallery-container">
			{shuffledMedia.map((m, i) => <GalleryMedia media={m} onMediaSelection={onMediaSelection} onMediaLikeToggle={onMediaLikeToggle} key={i} isLiked={isLikedMedia(m.id)} />)}
		</div>
	);
};

function getShuffledMedia(restaurants) {
	console.log("restaurants:", restaurants);
	const allMedia = restaurants.flatMap(restaurant => restaurant.media);
	console.log("allMedia:", allMedia);
	const shuffledMedia = _.shuffle(allMedia);
	// console.log("shuffledMedia:", shuffledMedia);
	return shuffledMedia.map(media => (new YelpMedia().populateFromBSON(media)));
}

export default Gallery;
