import './Login.css';
import { useState } from 'react';
import { Container } from 'reactstrap';
import {Link, Redirect, useLocation} from 'react-router-dom';
import AuthenticationOptions from "../common/AuthenticationOptions/AuthenticationOptions";
import LoginForm from "./LoginForm/LoginForm";
import * as Yup from 'yup';
import { useAuth } from "../../utils/auth/useAuth";
import useFlashMessages from "../../utils/useFlashMessages/useFlashMessages";
import withNavigationTracking from "../../utils/withNavigationTracking/withNavigationTracking.js";
import EventTrackerFactory from "../../../tracking/EventTrackerFactory.js";
import constants from "../../../constants/constants.js";

const TrackedLink = withNavigationTracking(Link);
const eventTracker = EventTrackerFactory.getTracker(EventTrackerFactory.types.BROWSER, window.location.hostname);
const { events } = constants;

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
    const [ showLogInForm, setShowLogInForm ] = useState(false);

    const auth = useAuth();
    const { messages, setErrorMessages } = useFlashMessages();
    const { state } = useLocation();

    const logIn = (credentials) => auth.logIn(credentials)
        .then((json) => {
            if (auth.isAuthenticated()) {
                console.log("User successfully logged in.");
                eventTracker.track(events.LOG_IN, { email: auth.getUser().getEmail() });
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
            setSubmitting(true);
            return logIn(credentials)
                .then(() => setSubmitting(false));
        }
    };

    const optionActions = {
        email: () => setShowLogInForm(true)
    };

    if (redirectToReferrer === true) {
        return <Redirect to={state?.from || '/'} />
    }

    return (
        <div className="login-container" style={{backgroundImage: 'url(/login-background.jpg)'}}>
            <div className="contrast-overlay" />
            <Container className="login-content-container">
                <p className="login-text text-container with-image-underlay">Log in to access your photos, notes, saved restaurants, and much more.</p>
                { showLogInForm
                    ? <LoginForm {...formProps} />
                    : <AuthenticationOptions {...{ optionActions, actionText: "Log in" }} />
                }
                <p className="need-account-text text-container with-image-underlay">Need an account? <TrackedLink className="sign-up-link" to="/user/signup">Sign up here.</TrackedLink></p>
                { showLogInForm
                    && <p className="return-to-options-text text-container with-image-underlay">Return to <Link className="login-link" to="#" onClick={() => setShowLogInForm(false)}>login options.</Link></p>
                }
            </Container>
            { messages }
        </div>
    );
};

export default Login;
