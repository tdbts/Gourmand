import ErrorMessage from "./ErrorMessage/ErrorMessage";
import Gallery from "./Gallery/Gallery";

const SearchResults = ({error, restaurants, onMediaSelection, isLikedMedia, searching, showLiked}) => (
    error
        ? <ErrorMessage error={error} />
        : <Gallery
            restaurants={restaurants}
            onMediaSelection={onMediaSelection}
            isLikedMedia={isLikedMedia}
            searching={searching}
            showLiked={showLiked} />
);

export default SearchResults;