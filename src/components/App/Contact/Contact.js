import './Contact.css';
import {
    Container,
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';

const onSubmitButtonClick = (e) => {
    e.preventDefault();
};

const Contact = ({}) => {
    return (
        <div className="contact-container">
            <div className="contact-background" style={{backgroundImage: 'url(/contact-background.jpg)'}} />
            <Container className="contact-content-container">
                <div className="text-container">
                    <h1 className="contact-header">Say Hello!</h1>
                    <p className="contact-text">Found a bug?  Have a feature request?  Just want to vent?  Let us know!</p>
                </div>
                <Form className="contact-form">
                    <FormGroup>
                        <Input type="text" name="name" placeholder="Name" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" name="email" placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="subject" placeholder="Subject" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" name="message" placeholder="Your Message" />
                    </FormGroup>
                    <Button onClick={onSubmitButtonClick} color="secondary">Submit</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Contact;

