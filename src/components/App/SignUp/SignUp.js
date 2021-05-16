import './SignUp.css';
import { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Redirect, useLocation } from 'react-router-dom';
import SignUpForm from './SignUpForm/SignUpForm';
import validationSchema from '../../../common/signUpValidationSchema';
import { useAuth } from "../../utils/auth/useAuth";
import useFlashMessages from "../../utils/useFlashMessages/useFlashMessages";

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
};

const onSubmit = (setSubmitting, setResponse, auth) => values => {
    console.log("values: ", values);
    setSubmitting(true);
    const likedMedia = auth.getUser().getLikedMedia().listify();
    console.log("Liked media for signup:", likedMedia);
    return auth.signUp({ ...values, likedMedia })
        .then(setResponse)
        .then(() => setSubmitting(false))
        .catch(e => console.error(e));
}

const SignUp = () => {
    const [ response, setResponse ] = useState(null);
    const [ submitting, setSubmitting ] = useState(false);
    const [ redirectToReferrer, setRedirectToReferrer ] = useState(false)

    const auth = useAuth();
    const { messages, setErrorMessages, setSuccessMessages } = useFlashMessages();
    const { state } = useLocation();

    const formProps = {
        submitting,
        initialValues,
        validationSchema,
        onSubmit: onSubmit(setSubmitting, setResponse, auth)
    };

    useEffect(() => {
        console.log("response:", response);
        if (response?.success) {
            setSuccessMessages(["Account successfully registered."]);
            setTimeout(() => setRedirectToReferrer(true), 500);
        } else if (response?.errors?.length) {
            setErrorMessages(response.errors);
        }
    }, [response]);

    if (redirectToReferrer === true) {
        return <Redirect to={state?.from || '/'} />
    }

    return (
        <div className="sign-up-container" style={{backgroundImage: 'url(/sign-up-background.jpg)'}}>
            <div className="contrast-overlay" />
            <Container className="sign-up-content-container">
                <p className="sign-up-text text-container with-image-underlay">
                    Sign up to share content, follow users, and access favorites across devices.
                </p>
                <SignUpForm {...formProps} />
            </Container>
            { messages }
        </div>
    );
};

export default SignUp;
