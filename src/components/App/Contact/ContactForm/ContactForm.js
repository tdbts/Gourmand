import {Button, Form, FormGroup, Input} from "reactstrap";

const ContactForm = ({name, email, subject, message, setName, setEmail, setSubject, setMessage, onSubmitButtonClick}) => (
    <Form className="contact-form">
        <FormGroup>
            <Input required type="text" name="name" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <Input required type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <Input type="text" name="subject" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <Input required type="textarea" name="message" placeholder="Your Message" value={message} onChange={e => setMessage(e.target.value)} />
        </FormGroup>
        <Button onClick={onSubmitButtonClick} color="secondary">Sign Up</Button>
    </Form>
);

export default ContactForm;
