import { useState, useEffect } from 'react';
import _ from 'underscore';
import YelpMedia from '../scrapers/yelp/YelpMedia';

const Gallery = ({restaurants, onMediaSelection}) => {
	// console.log("media:", media);
	const [shuffledMedia, setShuffledMedia] = useState([]);

	useEffect(() => {
		setShuffledMedia(getShuffledMedia(restaurants));
	}, [restaurants]);

	return (
		<>
			{shuffledMedia.map((m, i) => <img className="food-media thumbnail" src={m.getThumbnailURLs()[0]} key={i} onClick={() => onMediaSelection(m.id)} />)}
		</>
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