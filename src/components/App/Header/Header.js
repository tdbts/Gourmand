import './Header.css';
import { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import SearchForm from './SearchForm/SearchForm';
import ShowLikedCheckbox from './ShowLikedCheckbox/ShowLikedCheckbox';
import DistanceDropdown from './DistanceDropdown/DistanceDropdown';

function Header({onSearchRequest, description, setDescription, location, setLocation,
					requestingLocation, setRequestingLocation, setShowLiked, distance,
					onNavLinkClick, onDistanceDropdownClick, onShowLikedChange}) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar className="header-navbar" color="light" light expand="md">
			<NavLink id="home-link" className="navbar-brand company-name" to="/" onClick={() => onNavLinkClick('/')}>
				Gourmand
			</NavLink>
        	<NavbarToggler onClick={toggle} />
        	<Collapse className="header-collapse" in={true} isOpen={isOpen} timeout={200} navbar>
        		<Nav className="header-nav" navbar>
					<NavItem>
						<NavLink id="about-link" className="nav-link" to="/about" onClick={() => onNavLinkClick('/about')}>About</NavLink>
					</NavItem>
					<NavItem>
						<NavLink id="contact-link" className="nav-link" to="/contact" onClick={() => onNavLinkClick('/contact')}>Contact</NavLink>
					</NavItem>
					<NavItem>
						<NavLink id="login-link" className="nav-link" to="/login" onClick={() => onNavLinkClick('/login')}>Log In</NavLink>
					</NavItem>
					<NavItem className="nav-separator" />
					<NavItem>
						<SearchForm description={description} setDescription={setDescription} location={location}
									setLocation={setLocation} requestingLocation={requestingLocation} setRequestingLocation={setRequestingLocation}
									onSearchRequest={onSearchRequest} />
					</NavItem>
					<NavItem className="dropdown-nav-item">
						<DistanceDropdown distance={distance} onDistanceDropdownClick={onDistanceDropdownClick} />
						<ShowLikedCheckbox onChange={onShowLikedChange} />
					</NavItem>
        		</Nav>
        	</Collapse>
		</Navbar>
	);
}

export default Header;