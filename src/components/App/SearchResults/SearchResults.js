import ErrorMessage from "./ErrorMessage/ErrorMessage";
import Gallery from "./Gallery/Gallery";

const SearchResults = ({error, restaurants, setSelectedMediaID, isLikedMedia, searching, showLiked}) => (
    error
        ? <ErrorMessage error={error} />
        : <Gallery
            restaurants={restaurants}
            onMediaSelection={setSelectedMediaID}
            isLikedMedia={isLikedMedia}
            searching={searching}
            showLiked={showLiked} />
);

export default SearchResults;