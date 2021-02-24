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
  NavbarText  // Slogan?
} from 'reactstrap';
import SearchForm from './SearchForm';

function Header({onSearchRequest, searching}) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar className="header-navbar" color="light" light expand="md">
			<NavbarBrand href="/">Gourmand</NavbarBrand>
        	<NavbarToggler onClick={toggle} />
        	<Collapse isOpen={isOpen} navbar>
        		<Nav className="header-nav" navbar>
					<NavItem>
						<NavLink href="#">Contact</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#">Log In</NavLink>
					</NavItem>										        			
					<NavItem>
						<SearchForm onSearchRequest={onSearchRequest} searching={searching} />
					</NavItem>
        		</Nav>
        	</Collapse>
		</Navbar>
	);
}

export default Header;