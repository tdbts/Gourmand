import { useState } from 'react';
import {
	Container,
	Col,
	Row,
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	NavbarText,
	Label,
	Input,
	FormGroup  // Slogan?
} from 'reactstrap';
import SearchForm from './SearchForm';
import ShowLikedCheckbox from './ShowLikedCheckbox';
import DistanceDropdown from './DistanceDropdown';

function Header({onSearchRequest, setShowLiked}) {
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
						<DistanceDropdown />
						<ShowLikedCheckbox onChange={setShowLiked} />
					</NavItem>
        		</Nav>
        	</Collapse>
		</Navbar>
	);
}

export default Header;