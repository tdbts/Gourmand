import { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import SearchForm from './SearchForm';
import ShowLikedCheckbox from './ShowLikedCheckbox';
import DistanceDropdown from './DistanceDropdown';

function Header({onSearchRequest, setShowLiked, distance, setDistance}) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar className="header-navbar" color="light" light expand="md">
			<NavbarBrand href="/">Gourmand</NavbarBrand>
        	<NavbarToggler onClick={toggle} />
        	<Collapse className="header-collapse" in={true} isOpen={isOpen} timeout={200} navbar>
        		<Nav className="header-nav" navbar>
					<NavItem>
						<NavLink href="#">About</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#">Contact</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#">Log In</NavLink>
					</NavItem>
					<NavItem className="nav-separator" />
					<NavItem>
						<SearchForm onSearchRequest={onSearchRequest} />
					</NavItem>
					<NavItem className="dropdown-nav-item">
						<DistanceDropdown distance={distance} setDistance={setDistance} />
						<ShowLikedCheckbox onChange={setShowLiked} />
					</NavItem>
        		</Nav>
        	</Collapse>
		</Navbar>
	);
}

export default Header;