import './SignUpButton.css';
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import withNavigationTracking from "../../../utils/withNavigationTracking/withNavigationTracking";

const TrackedLink = withNavigationTracking(NavLink);

const SignUpButton = ({}) => (
    <Button className="sign-up-button" color="secondary" size="sm">
        <TrackedLink to="/user/signup">Sign Up</TrackedLink>
    </Button>
);

export default SignUpButton;
