import './Gallery.css';
import { useState, useEffect } from 'react';
import GalleryMedia from './GalleryMedia/GalleryMedia';
import SearchCurtain from './SearchCurtain/SearchCurtain';
import { CSSTransition } from "react-transition-group";
import MediaModal from "./MediaModal/MediaModal";

const NOOP = () => {};

const Gallery = ({media, selectedMediaID, onMediaSelection, isLikedMedia, searching,
					 showLiked, mediaModalProps, onEnter, onEntered, onExited, transitionTimeout}) => {
	const [renderedMedia, setRenderedMedia] = useState([]);
	const [canEnter, setCanEnter] = useState(true);
	const color = renderedMedia.length ? "light" : "dark";
	const canRender = !searching && canEnter;

	useEffect(() => {
		if (canRender && (media !== renderedMedia) && media.length) {
			setRenderedMedia(media);
		}
	}, [canRender, media]);

	useEffect(() => {
		if (searching) {
			setCanEnter(false);
		}
	}, [searching]);

	return (
		<CSSTransition classNames={"thumbnail-swap"} in={canRender} appear={true} timeout={transitionTimeout || 1000} onEnter={onEnter} onEntered={onEntered} onExited={() => setCanEnter(true)}>
			<div className="gallery-container">
				{filterLiked(renderedMedia, showLiked, isLikedMedia).map((m) => (
					<GalleryMedia key={m.id} searching={searching} media={m} onMediaSelection={onMediaSelection} isLiked={isLikedMedia(m.id)} />
				))}
				{ searching && <SearchCurtain color={color} />}
				{ selectedMediaID && <MediaModal {...mediaModalProps} /> }
			</div>
		</CSSTransition>
	);
};

function filterLiked(media, showLiked, isLikedMedia) {
	return showLiked ? media.filter(media => isLikedMedia(media.id)) : media;
}

export default Gallery;
