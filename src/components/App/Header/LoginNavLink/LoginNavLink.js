import { NavLink } from "react-router-dom";
import withNavigationTracking from "../../../utils/withNavigationTracking/withNavigationTracking";

const TrackedLink = withNavigationTracking(NavLink);

const LoginNavLink = ({}) => (
    <TrackedLink id="login-link" className="nav-link" to="/user/login">Log In</TrackedLink>
);

export default LoginNavLink;
