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
import withNavigationTracking from "../../utils/withNavigationTracking/withNavigationTracking";

const TrackedLink = withNavigationTracking(NavLink);

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

const getLogInOutNavLink = (auth) => {
	return auth.isAuthenticated()
		? <LogoutNavLink />
		: <LoginNavLink />;
};

const Header = ({openedHeader, setOpenedHeader, onSearchRequest, description, setDescription, location, setLocation,
					requestingLocation, setRequestingLocation, distance,
					onDistanceDropdownClick, onShowLikedChange}) => {
	const auth = useAuth();
	const toggle = () => setOpenedHeader(!openedHeader);

	return (
		<Navbar className="header-navbar" color="light" light>
			<TrackedLink id="home-link" className="navbar-brand company-name" to="/">
				Gourmand
			</TrackedLink>
			{ getSignUpButton(auth) }
        	<NavbarToggler onClick={toggle} />
        	<Collapse className="header-collapse" in={true} isOpen={openedHeader} timeout={200} navbar>
        		<Nav className="header-nav" navbar>
					<NavItem>
						<TrackedLink id="about-link" className="nav-link" to="/about">About</TrackedLink>
					</NavItem>
					<NavItem>
						<TrackedLink id="contact-link" className="nav-link" to="/contact">Contact</TrackedLink>
					</NavItem>
					<NavItem>
						{ getLogInOutNavLink(auth) }
					</NavItem>
					<NavItem className="nav-separator" />
					<NavItem>
						<SearchForm {...{ description, setDescription, location, setLocation, requestingLocation, setRequestingLocation, onSearchRequest }} />
					</NavItem>
					<NavItem className="dropdown-nav-item">
						<DistanceDropdown {...{ distance, onDistanceDropdownClick }} />
						<ShowLikedCheckbox onChange={onShowLikedChange} />
					</NavItem>
        		</Nav>
        	</Collapse>
		</Navbar>
	);
}

export default Header;