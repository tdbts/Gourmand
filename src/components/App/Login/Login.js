import './Login.css';
import { Container } from 'reactstrap';
import LoginForm from "./LoginForm/LoginForm";
import { useState } from 'react';

const Login = ({}) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const formProps = {
        email, setEmail,
        password, setPassword
    };

    return (
        <div className="login-container" style={{backgroundImage: 'url(/login-background.jpg)'}}>
            <div className="contrast-overlay" />
            <Container className="login-content-container">
                <p className="login-text text-container with-image-underlay">Log in to access your photos, notes, and saved restaurants.</p>
                <LoginForm {...formProps} />
            </Container>
        </div>
    );
};

export default Login;
