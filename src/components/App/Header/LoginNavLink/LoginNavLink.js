import { NavLink } from "react-router-dom";

const LoginNavLink = ({ onNavLinkClick }) => (
    <NavLink id="login-link" className="nav-link" to="/user/login" onClick={() => onNavLinkClick('/user/login')}>Log In</NavLink>
);

export default LoginNavLink;
