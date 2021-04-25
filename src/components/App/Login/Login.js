import './Login.css';
import { Container } from 'reactstrap';
import LoginForm from "./LoginForm/LoginForm";
import * as Yup from 'yup';

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
    const formProps = {
        initialValues,
        validationSchema,
        onSubmit: (values) => console.log("values:", values)
    };

    return (
        <div className="login-container" style={{backgroundImage: 'url(/login-background.jpg)'}}>
            <div className="contrast-overlay" />
            <Container className="login-content-container">
                <p className="login-text text-container with-image-underlay">Log in to access your photos, notes, saved restaurants, and much more.</p>
                <LoginForm {...formProps} />
            </Container>
        </div>
    );
};

export default Login;
