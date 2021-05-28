import './Login.css';
import { useState } from 'react';
import { Container } from 'reactstrap';
import { Redirect, useLocation } from 'react-router-dom';
import LoginForm from "./LoginForm/LoginForm";
import * as Yup from 'yup';
import { useAuth } from "../../utils/auth/useAuth";
import useFlashMessages from "../../utils/useFlashMessages/useFlashMessages";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email is not valid.")
        .required("Email is required."),
    password: Yup.string()
        .required("Password is required.")
        .min(8, "Password is too short.")
});

const initialValues = {
    email: '',
    password: ''
};

const Login = ({}) => {
    const [ redirectToReferrer, setRedirectToReferrer ] = useState(false)
    const [ submitting, setSubmitting ] = useState(false);

    const auth = useAuth();
    const { messages, setErrorMessages } = useFlashMessages();
    const { state } = useLocation();

    const logIn = (credentials) => auth.logIn(credentials)
        .then((json) => {
            if (auth.isAuthenticated()) {
                console.log("User successfully logged in.");
                setRedirectToReferrer(true);
            } else {
                setErrorMessages(json.errors);
            }
        })
        .catch(e => {
            console.error(e);
            setErrorMessages([e.message]);
        });

    const formProps = {
        initialValues,
        validationSchema,
        submitting,
        onSubmit: (credentials) => {
            console.log("credentials:", credentials);
            setSubmitting(true);
            return logIn(credentials)
                .then(() => setSubmitting(false));
        }
    };

    if (redirectToReferrer === true) {
        return <Redirect to={state?.from || '/'} />
    }

    return (
        <div className="login-container" style={{backgroundImage: 'url(/login-background.jpg)'}}>
            <div className="contrast-overlay" />
            <Container className="login-content-container">
                <p className="login-text text-container with-image-underlay">Log in to access your photos, notes, saved restaurants, and much more.</p>
                <LoginForm {...formProps} />
            </Container>
            { messages }
        </div>
    );
};

export default Login;
