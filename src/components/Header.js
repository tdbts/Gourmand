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

function Header({onSearchRequest}) {
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
					<NavItem>
						<SearchForm onSearchRequest={onSearchRequest} />
					</NavItem>
					<NavItem>
						<FormGroup className={"header-check filter-liked-check"} check>
							<Label check>
								<Input type="checkbox" />
								<span className={"header-check-text"}>Show Liked</span>
							</Label>
						</FormGroup>
					</NavItem>
        		</Nav>
        	</Collapse>
		</Navbar>
	);
}

export default Header;