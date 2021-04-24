import './SignUpButton.css';
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";

const SignUpButton = ({}) => (
    <Button className="sign-up-button" color="secondary" size="sm">
        <NavLink href="#" to="#">Sign Up</NavLink>
    </Button>
);

export default SignUpButton;
