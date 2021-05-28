import './Contact.css';
import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import ContactForm from "./ContactForm/ContactForm";
import scrollToTop from "../../utils/scrollToTop";

const statuses = {
    UNSENT: '',
    SUCCESS: 'success',
    FAILURE: 'failure'
}

const submitForm = (data, onSuccess, onError) => {
    fetch('/contact', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => {
            if (json.status === statuses.SUCCESS) {
                onSuccess(json);
            } else {
                onError(json, json);
            }
        })
        .catch(onError);
}

const onSubmitButtonClick = (e, {name, email, subject, message}, { onSuccess, onError }) => {
    e.preventDefault();

    const data = {
        name,
        email,
        subject: subject || "[ No Subject ]",
        message
    };

    submitForm(data, onSuccess, onError);
};

const onSuccess = (json, setStatus) => {
    setStatus(json.status);
    scrollToTop();
};

const onError = (e, json, setStatus) => {
    console.error(e);
    setStatus(json.status);
    scrollToTop();
};

const UnsetMessage = () => (
    <React.Fragment>
        <h1 className="contact-header">Say Hello!</h1>
        <p className="contact-text">Found a bug?  Have a feature request?  Just want to vent?  Let us know!</p>
    </React.Fragment>
);

const SuccessMessage = () => (
        <React.Fragment>
            <h1 className="contact-header">Message Received!</h1>
            <p className="contact-text">Thanks for reaching out!  We'll get back to you as soon as we can.</p>
        </React.Fragment>
);

const ErrorMessage = () => (
    <React.Fragment>
        <h1 className="contact-header">Uh oh!</h1>
        <p className="contact-text">Looks like something went wrong.  Our team has been notified and we're working on the issue.</p>
    </React.Fragment>
);

const getTextComponent = (status) => {
    if (status === statuses.UNSENT)
        return <UnsetMessage />;

    if (status === statuses.SUCCESS)
        return <SuccessMessage />;

    return <ErrorMessage />;
};

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (status !== statuses.UNSENT) {
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        }
    }, [status]);

    const contactFormProps = {
        name, email, subject, message,
        setName, setEmail, setSubject, setMessage,
        onSubmitButtonClick: (e) => onSubmitButtonClick(
            e,
            {name, email, subject, message},
            {
                onSuccess: (json) => onSuccess(json, setStatus),
                onError: (e, json) => onError(e, json, setStatus)
            })
    };

    return (
        <div className="contact-container">
            <div className="contact-background" style={{backgroundImage: 'url(/contact-background.jpg)'}} />
            <Container className="contact-content-container">
                <div className="text-container with-image-underlay">
                    { getTextComponent(status) }
                </div>
                {(status === statuses.UNSENT) && <ContactForm {...contactFormProps} />}
            </Container>
        </div>
    );
};

export default Contact;

