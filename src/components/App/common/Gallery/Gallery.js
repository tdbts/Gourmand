import './Gallery.css';
import { useState, useEffect } from 'react';
import _ from 'underscore';
import YelpMedia from '../../../../scrapers/yelp/YelpMedia';
import GalleryMedia from './GalleryMedia/GalleryMedia';
import SearchCurtain from './SearchCurtain/SearchCurtain';
import { CSSTransition } from "react-transition-group";
import MediaModal from "./MediaModal/MediaModal";

const Gallery = ({media, selectedMediaID, onMediaSelection, isLikedMedia, searching,
					 showLiked, mediaModalProps, onEntered, onExited, transitionTimeout}) => {
	// console.log("media:", media);
	const [canEnter, setCanEnter] = useState(true);
	const color = media.length ? "light" : "dark";
	const canRender = !searching && canEnter;

	return (
		<CSSTransition classNames={"thumbnail-swap"} in={canRender} appear={true} timeout={transitionTimeout || 2000}
					   onEntered={onEntered} onExit={() => setCanEnter(false)} onExited={() => (setCanEnter(true) && onExited && onExited())}>
			<div className="gallery-container">
				{filterLiked(media, showLiked, isLikedMedia).map((m, i) => (
					<GalleryMedia key={i} searching={searching} media={m} onMediaSelection={onMediaSelection} isLiked={isLikedMedia(m.id)} />
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

export default Gallery;
