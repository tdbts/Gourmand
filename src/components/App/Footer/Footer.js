import './Footer.css';
import {Nav, Navbar, NavItem, NavLink} from "reactstrap";
import {HomeIcon} from "./HomeIcon";
import {SearchIcon} from "./SearchIcon";
import {PlusIcon} from "./PlusIcon";
import {PinIcon} from "./PinIcon";
import {UserIcon} from "./UserIcon";
import { useAuth } from "../../utils/auth/useAuth";

const Footer = ({}) => {
    const auth = useAuth();

    return auth.isAuthenticated() && (
        <Navbar className="footer-navbar fixed-bottom" color="light" light>
            <Nav>
                <NavItem>
                    <NavLink>
                        <HomeIcon/>
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink>
                        <SearchIcon/>
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink>
                        <PlusIcon/>
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink>
                        <PinIcon/>
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink>
                        <UserIcon/>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Footer;
