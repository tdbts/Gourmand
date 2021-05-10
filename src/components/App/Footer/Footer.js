import './Footer.css';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";

// TODO: Only show footer if logged in
const Footer = ({}) => {
    return (
        <Navbar className="footer-navbar fixed-bottom" color="light" light>
            <Nav>
                <NavItem>
                    <NavLink>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                             className="svg-inline--fa fa-home fa-w-18 fa-2x">
                            <path fill="currentColor"
                                  d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
                                  className=""></path>
                        </svg>
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink>
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             className="svg-inline--fa fa-search fa-w-16 fa-2x">
                            <path fill="currentColor"
                                  d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                                  className=""></path>
                        </svg>
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink>
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus-circle" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             className="svg-inline--fa fa-plus-circle fa-w-16 fa-2x">
                            <path fill="currentColor"
                                  d="M384 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm120 16c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-48 0c0-110.5-89.5-200-200-200S56 145.5 56 256s89.5 200 200 200 200-89.5 200-200z"
                                  className=""></path>
                        </svg>
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt"
                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                             className="svg-inline--fa fa-map-marker-alt fa-w-12 fa-2x">
                            <path fill="currentColor"
                                  d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                                  className=""></path>
                        </svg>
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                    <NavLink>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                             className="svg-inline--fa fa-user fa-w-14 fa-2x">
                            <path fill="currentColor"
                                  d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                                  className=""></path>
                        </svg>
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Footer;
