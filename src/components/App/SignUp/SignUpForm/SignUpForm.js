import './SignUpForm.css';
import {Button, Form, FormGroup, FormFeedback, FormText, Input} from "reactstrap";
import {Link} from "react-router-dom";

const SignUpForm = ({ name, email, password, passwordConfirm, setName, setEmail, setPassword, setPasswordConfirm, onSubmitButtonClick }) => {
    return (
        <Form className="sign-up-form">
            <FormGroup>
                <Input required type="text" name="name" placeholder="Name"
                       value={name} onChange={e => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Input required type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Input required type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.targert.value)} />
            </FormGroup>
            <FormGroup>
                <Input required type="password" name="password-confirm" placeholder="Confirm Password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.targert.value)} />
            </FormGroup>
            <Button onClick={onSubmitButtonClick} color="danger" block>Sign Up</Button>
            <p className="have-account-text text-container with-image-underlay">Have an account? <Link className="login-link" to="/user/login">Log in here.</Link></p>
        </Form>
    );
};

export default SignUpForm;
