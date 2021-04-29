import './SignUp.css';
import { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import SignUpForm from './SignUpForm/SignUpForm';
import FlashMessages from "../common/FlashMessages/FlashMessages";
import validationSchema from '../../../common/signUpValidationSchema';

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
};

const onSubmit = (setSubmitting, setResponse) => values => {
    console.log("values: ", values);
    setSubmitting(true);
    fetch('/user/signup', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(values) // body data type must match "Content-Type" header
        })
        .then(response => console.log("response:", response) || response.json())
        .then(setResponse)
        .then(() => setSubmitting(false))
        .catch(e => console.error(e));
}

const SignUp = ({}) => {
    const [ response, setResponse ] = useState(null);
    const [ flashMessages, setFlashMessages ] = useState([]);
    const [ submitting, setSubmitting ] = useState(false);

    const formProps = {
        submitting,
        initialValues,
        validationSchema,
        onSubmit: onSubmit(setSubmitting, setResponse)
    };

    useEffect(() => {
        console.log("response:", response);
        if (response && response.errors.length) {
            setFlashMessages(response.errors);
        }
    }, [response]);

    return (
        <div className="sign-up-container" style={{backgroundImage: 'url(/sign-up-background.jpg)'}}>
            <div className="contrast-overlay" />
            <Container className="sign-up-content-container">
                <p className="sign-up-text text-container with-image-underlay">
                    Sign up to share content, follow users, and access favorites across devices.
                </p>
                <SignUpForm {...formProps} />
            </Container>
            <FlashMessages
                timeout={250}
                duration={5000}
                level="error"
                messages={flashMessages}
                onClose={i => setFlashMessages(flashMessages.filter((message, j) => i !== j ))}
            />
        </div>
    );
};

export default SignUp;
