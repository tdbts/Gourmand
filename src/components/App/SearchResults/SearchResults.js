import SearchResultsView from "./SearchResultsView/SearchResultsView";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

const SearchResults = ({error, ...props }) => (
    error
        ? <ErrorMessage {...{error}} />
        : <SearchResultsView {...props} />
);

export default SearchResults;
