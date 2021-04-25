import './SignUp.css';
import { Container } from 'reactstrap';
import SignUpForm from "./SignUpForm/SignUpForm";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, "Name is too short.")
        .max(50, "Name is too long.")
        .required("Name is required."),
    email: Yup.string()
        .email("Email is not valid.")
        .required("Email is required."),
    password: Yup.string()
        .required("Password is required.")
        .min(8, "Password is too short.")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Please use a stronger password."
        ),
    passwordConfirm: Yup.string()
        .when("password", {
            is: val => (val && (val.length > 0)),
            then: Yup.string()
                .oneOf(
                    [Yup.ref("password")],
                    "Passwords do not match."
                )
        })
});

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
};

const SignUp = ({}) => {
    const formProps = {
        initialValues,
        validationSchema,
        onSubmit: (values) => console.log("values:", values)
    };

    return (
        <div className="sign-up-container" style={{backgroundImage: 'url(/sign-up-background.jpg)'}}>
            <div className="contrast-overlay" />
            <Container className="sign-up-content-container">
                <p className="sign-up-text text-container with-image-underlay">
                    Sign up to share content, follow users, and access favorites across devices.
                </p>
                <SignUpForm {...formProps} />
            </Container>
        </div>
    );
};

export default SignUp;
