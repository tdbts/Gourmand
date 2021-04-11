import './Gallery.css';
import { useState, useEffect } from 'react';
import _ from 'underscore';
import YelpMedia from '../../../../scrapers/yelp/YelpMedia';
import GalleryMedia from './GalleryMedia/GalleryMedia';
import SearchCurtain from './SearchCurtain/SearchCurtain';
import { CSSTransition } from "react-transition-group";
import MediaModal from "./MediaModal/MediaModal";

const Gallery = ({restaurants, selectedMediaID, onMediaSelection, isLikedMedia, searching,
					 showLiked, mediaModalProps, mediaOrder, onEntered, transitionTimeout}) => {
	// console.log("media:", media);
	const [canShuffleMedia, setCanShuffleMedia] = useState(!mediaOrder);
	const [shuffledMedia, setShuffledMedia] = useState([]);
	const [canEnter, setCanEnter] = useState(true);
	const color = restaurants.length ? "light" : "dark";
	const canRender = !searching && canEnter;
	const renderedMedia = mediaOrder ? getOrderedMedia(restaurants, mediaOrder) : filterLiked(shuffledMedia, showLiked, isLikedMedia);
	const onExited = () => {
		setCanShuffleMedia(true);
		setCanEnter(true);
	};

	useEffect(() => {
		if (!mediaOrder) {
			setCanShuffleMedia(canRender);
		}
	}, [searching, canEnter])

	useEffect(() => {
		if (canShuffleMedia) {
			setShuffledMedia(getShuffledMedia(restaurants));
		}
	}, [canShuffleMedia, restaurants]);

	return (
		<CSSTransition classNames={"thumbnail-swap"} in={canRender} appear={true} timeout={transitionTimeout || 2000}
					   onEntered={onEntered} onExit={() => setCanEnter(false)} onExited={onExited}>
			<div className="gallery-container">
				{renderedMedia.map((media, i) => (
					<GalleryMedia key={i} searching={searching} media={media} onMediaSelection={onMediaSelection} isLiked={isLikedMedia(media.id)} />
				))}
				{ searching && <SearchCurtain color={color} />}
				{selectedMediaID && <MediaModal {...mediaModalProps} />}
			</div>
		</CSSTransition>
	);
};

function filterLiked(media, showLiked, isLikedMedia) {
	return showLiked ? media.filter(media => isLikedMedia(media.id)) : media;
}

function getOrderedMedia(restaurants, mediaOrder) {
	if (!restaurants.length)
		return restaurants;

	const mediaByID = restaurants
		.flatMap(restaurant => restaurant.media)
		.reduce((map, media) => {
			map[media.id] = media;
			return map;
		}, {})

	return mediaOrder
		.map(id => mediaByID[id])
		.map(media => (YelpMedia.populateFromBSON(media)));
}

function getShuffledMedia(restaurants) {
	console.log("restaurants:", restaurants);
	const allMedia = restaurants.flatMap(restaurant => restaurant.media);
	console.log("allMedia:", allMedia);
	const shuffledMedia = _.shuffle(allMedia);
	// console.log("shuffledMedia:", shuffledMedia);
	return shuffledMedia.map(media => (YelpMedia.populateFromBSON(media)));
}

export default Gallery;
