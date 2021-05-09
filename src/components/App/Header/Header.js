import './Header.css';
import { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Button
} from 'reactstrap';
import { NavLink } from 'react-router-dom'
import { useAuth } from "../../utils/auth/useAuth";
import SignUpButton from "./SignUpButton/SignUpButton";
import SearchForm from './SearchForm/SearchForm';
import ShowLikedCheckbox from './ShowLikedCheckbox/ShowLikedCheckbox';
import DistanceDropdown from './DistanceDropdown/DistanceDropdown';
import LoginNavLink from "./LoginNavLink/LoginNavLink";
import LogoutNavLink from "./LogoutNavLink/LogoutNavLink";

const getSignUpButton = (auth) => {
	return !auth.isAuthenticated()
		&& (
			<Nav className="ml-auto mr-3" pills>
				<NavItem>
					<SignUpButton />
				</NavItem>
			</Nav>
		);
};

const getLogInOutNavLink = (auth, onNavLinkClick) => {
	return auth.isAuthenticated()
		? <LogoutNavLink onNavLinkClick={onNavLinkClick} />
		: <LoginNavLink onNavLinkClick={onNavLinkClick} />;
};

const Header = ({onSearchRequest, description, setDescription, location, setLocation,
					requestingLocation, setRequestingLocation, setShowLiked, distance,
					onNavLinkClick, onDistanceDropdownClick, onShowLikedChange}) => {
	const auth = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar className="header-navbar" color="light" light>
			<NavLink id="home-link" className="navbar-brand company-name" to="/" onClick={() => onNavLinkClick('/')}>
				Gourmand
			</NavLink>
			{ getSignUpButton(auth) }
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
						{ getLogInOutNavLink(auth, onNavLinkClick ) }
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