import './SignUp.css';
import { useState } from 'react';
import { Container } from 'reactstrap';
import SignUpForm from "./SignUpForm/SignUpForm";

const SignUp = ({}) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirm, setPasswordConfirm ] = useState('');

    const formProps = {
        name, email, password, passwordConfirm,
        setName, setEmail, setPassword, setPasswordConfirm
    };

    return (
        <div className="sign-up-container" style={{backgroundImage: 'url(/sign-up-background.jpg)'}}>
            <div className="contrast-overlay" />
            <Container className="sign-up-content-container">
                <p className="sign-up-text text-container with-image-underlay">
                    Sign up to share content, message users, and access favorites across devices.
                </p>
                <SignUpForm {...formProps} />
            </Container>
        </div>
    );
};

export default SignUp;
