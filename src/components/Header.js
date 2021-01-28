import SearchForm from './SearchForm';

function Header({onSearchRequest, searching}) {
	return (
		<div className="header-container">
			<div className="header-content-wrapper">
				<h1 className="title-header">Gourmand</h1>
				<SearchForm onSearchRequest={onSearchRequest} searching={searching} />
			</div>
		</div>
	);	
}

export default Header;