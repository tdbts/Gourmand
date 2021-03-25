import './Header.css';
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
// import { NavLink } from 'react-router-dom'
import SearchForm from './SearchForm/SearchForm';
import ShowLikedCheckbox from './ShowLikedCheckbox/ShowLikedCheckbox';
import DistanceDropdown from './DistanceDropdown/DistanceDropdown';

function Header({onSearchRequest, description, setDescription, location, setLocation,
					requestingLocation, setRequestingLocation, setShowLiked, distance, setDistance}) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar className="header-navbar" color="light" light expand="md">
			<NavbarBrand id="home-link" href="/">Gourmand</NavbarBrand>
        	<NavbarToggler onClick={toggle} />
        	<Collapse className="header-collapse" in={true} isOpen={isOpen} timeout={200} navbar>
        		<Nav className="header-nav" navbar>
					<NavItem>
						<NavLink id="about-link" href="/about">About</NavLink>
					</NavItem>
					<NavItem>
						<NavLink id="contact-link" href="/contact">Contact</NavLink>
					</NavItem>
					<NavItem>
						<NavLink id="login-link" href="/login">Log In</NavLink>
					</NavItem>
					<NavItem className="nav-separator" />
					<NavItem>
						<SearchForm description={description} setDescription={setDescription} location={location}
									setLocation={setLocation} requestingLocation={requestingLocation} setRequestingLocation={setRequestingLocation}
									onSearchRequest={onSearchRequest} />
					</NavItem>
					<NavItem className="dropdown-nav-item">
						<DistanceDropdown distance={distance} setDistance={setDistance} onSearchRequest={onSearchRequest} />
						<ShowLikedCheckbox onChange={setShowLiked} />
					</NavItem>
        		</Nav>
        	</Collapse>
		</Navbar>
	);
}

export default Header;