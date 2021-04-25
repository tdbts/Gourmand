import './LoginForm.css';
import { Button, FormGroup, FormFeedback } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import setFieldClass from "../../../utils/setFieldClass";

const LoginForm = ({ initialValues, validationSchema, onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik;

                return (
                    <Form className="login-form">
                        <FormGroup>
                            <Field required type="email" name="email" placeholder="Email"
                                   className={setFieldClass(touched.email, errors.email)} />
                            <ErrorMessage name="email" component={FormFeedback}
                                          className="field-error-feedback" />
                        </FormGroup>
                        <FormGroup>
                            <Field required type="password" name="password" placeholder="Password"
                                   className={setFieldClass(touched.password, errors.password)} />
                            <ErrorMessage name="password" component={FormFeedback}
                                          className="field-error-feedback" />
                        </FormGroup>
                        <Button type="submit" disabled={!(dirty && isValid)} color="danger" block>Log in</Button>
                        <p className="need-account-text text-container with-image-underlay">Need an account? <Link className="sign-up-link" to="/user/signup">Sign up here.</Link></p>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LoginForm;
