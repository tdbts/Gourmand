import ErrorMessage from "./ErrorMessage/ErrorMessage";
import Gallery from "../common/Gallery/Gallery";
import withShuffledMedia from "../common/Gallery/withShuffledMedia";

const ShuffledGallery = withShuffledMedia(Gallery);

const SearchResults = ({error, restaurants, selectedMediaID, onMediaSelection, isLikedMedia, searching, showLiked, mediaModalProps}) => (
    error
        ? <ErrorMessage error={error} />
        : <ShuffledGallery
            restaurants={restaurants}
            selectedMediaID={selectedMediaID}
            onMediaSelection={onMediaSelection}
            isLikedMedia={isLikedMedia}
            searching={searching}
            showLiked={showLiked}
            mediaModalProps={mediaModalProps} />
);

export default SearchResults;