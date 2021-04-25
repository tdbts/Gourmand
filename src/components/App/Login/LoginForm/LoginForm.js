import './LoginForm.css';
import {Button, Form, FormGroup, Input} from "reactstrap";
import {Link} from "react-router-dom";

const LoginForm = ({email, password, setEmail, setPassword, onSubmitButtonClick}) => (
    <Form className="login-form">
        <FormGroup>
            <Input required type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
            <Input required type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.targert.value)} />
        </FormGroup>
        <Button onClick={onSubmitButtonClick} color="danger" block>Log in</Button>
        <p className="need-account-text text-container with-image-underlay">Need an account? <Link className="sign-up-link" to="/user/signup">Sign up here.</Link></p>
    </Form>
);

export default LoginForm;
