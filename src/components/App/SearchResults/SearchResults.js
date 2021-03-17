import ErrorMessage from "./ErrorMessage/ErrorMessage";
import Gallery from "./Gallery/Gallery";

const SearchResults = ({error, restaurants, selectedMediaID, onMediaSelection, isLikedMedia, searching, showLiked, mediaModalProps}) => (
    error
        ? <ErrorMessage error={error} />
        : <Gallery
            restaurants={restaurants}
            selectedMediaID={selectedMediaID}
            onMediaSelection={onMediaSelection}
            isLikedMedia={isLikedMedia}
            searching={searching}
            showLiked={showLiked}
            mediaModalProps={mediaModalProps} />
);

export default SearchResults;