import './Footer.css';
import {Nav, Navbar, NavItem
    // , NavLink
} from "reactstrap";
import {NavLink} from 'react-router-dom';
import {HomeIcon} from "./HomeIcon";
import {SearchIcon} from "./SearchIcon";
import {PlusIcon} from "./PlusIcon";
import {PinIcon} from "./PinIcon";
import {UserIcon} from "./UserIcon";
import withNavigationTracking from "../../utils/withNavigationTracking/withNavigationTracking";

const TrackedLink = withNavigationTracking(NavLink);

const Footer = ({ openedHeader, setOpenedHeader }) => {
    return (
        <Navbar className="footer-navbar fixed-bottom" color="light" light>
            <Nav>
                <NavItem>
                    <TrackedLink className="nav-link" to="/">
                        <HomeIcon/>
                    </TrackedLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink className="nav-link" to="#" onClick={() => setOpenedHeader(!openedHeader)}>
                        <SearchIcon />
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <TrackedLink className="nav-link" to="/upload">
                        <PlusIcon/>
                    </TrackedLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <TrackedLink className="nav-link" to="/map">
                        <PinIcon/>
                    </TrackedLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <TrackedLink className="nav-link" to="/user/profile">
                        <UserIcon/>
                    </TrackedLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Footer;
