import './Gallery.css';
import { useState, useEffect } from 'react';
import _ from 'underscore';
import YelpMedia from '../../../scrapers/yelp/YelpMedia';
import GalleryMedia from './GalleryMedia/GalleryMedia';
import SearchCurtain from './SearchCurtain/SearchCurtain';
import { CSSTransition } from "react-transition-group";

const Gallery = ({restaurants, onMediaSelection, isLikedMedia, searching, showLiked}) => {
	// console.log("media:", media);
	const [canShuffleMedia, setCanShuffleMedia] = useState(true);
	const [shuffledMedia, setShuffledMedia] = useState([]);
	const [canEnter, setCanEnter] = useState(true);
	const color = restaurants.length ? "light" : "dark";
	const canRender = !searching && canEnter;
	const renderedMedia = filterLiked(shuffledMedia, showLiked, isLikedMedia);
	const onExited = () => {
		setCanShuffleMedia(true);
		setCanEnter(true);
	};

	useEffect(() => {
		setCanShuffleMedia(canRender);
	}, [searching, canEnter])

	useEffect(() => {
		if (canShuffleMedia) {
			setShuffledMedia(getShuffledMedia(restaurants));
		}
	}, [canShuffleMedia]);

	return (
		<CSSTransition classNames={"thumbnail-swap"} in={canRender} appear={true} timeout={2000} onExit={() => setCanEnter(false)} onExited={onExited}>
			<div className="gallery-container">
				{renderedMedia.map((media, i) => (
					<GalleryMedia key={i} searching={searching} media={media} onMediaSelection={onMediaSelection} isLiked={isLikedMedia(media.id)} />
				))}
				{ searching && <SearchCurtain color={color} />}
			</div>
		</CSSTransition>
	);
};

function filterLiked(media, showLiked, isLikedMedia) {
	return showLiked ? media.filter(media => isLikedMedia(media.id)) : media;
}

function getShuffledMedia(restaurants) {
	console.log("restaurants:", restaurants);
	const allMedia = restaurants.flatMap(restaurant => restaurant.media);
	console.log("allMedia:", allMedia);
	const shuffledMedia = _.shuffle(allMedia);
	// console.log("shuffledMedia:", shuffledMedia);
	return shuffledMedia.map(media => (new YelpMedia().populateFromBSON(media)));
}

export default Gallery;
