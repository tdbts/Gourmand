import './SearchCurtain.css';
import { Spinner } from 'reactstrap';

const SearchCurtain = ({ color }) => {
	return (
		<div className="search-curtain">
			<div className="search-curtain-backdrop"></div>
			<Spinner className="search-curtain-spinner" color={color} />
		</div>
	);
};

export default SearchCurtain;
