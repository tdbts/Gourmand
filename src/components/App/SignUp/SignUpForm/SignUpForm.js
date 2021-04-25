import './SignUpForm.css';
import {Button, FormGroup, FormFeedback } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import setFieldClass from "../../../utils/setFieldClass";

// TODO: Open issue - Webkit autocomplete classes hide validation icons in form fields
const SignUpForm = ({ initialValues, validationSchema, onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik;

                return (
                    <Form className="sign-up-form">
                        <FormGroup>
                            <Field required type="text" name="name" placeholder="Name"
                                   className={setFieldClass(touched.name, errors.name)} />
                            <ErrorMessage name="name" component={FormFeedback}
                                    className="field-error-feedback" />
                        </FormGroup>
                        <FormGroup>
                            <Field required type="email" name="email" placeholder="Email"
                                    className={setFieldClass(touched.email, errors.email)}/>
                            <ErrorMessage name="email" component={FormFeedback}
                                          className="field-error-feedback" />
                        </FormGroup>
                        <FormGroup>
                            <Field required type="password" name="password" placeholder="Password"
                                    className={setFieldClass(
                                        touched.password, errors.password)} />
                            <ErrorMessage name="password" component={FormFeedback}
                                          className="field-error-feedback" />
                        </FormGroup>
                        <FormGroup>
                            <Field required type="password" name="passwordConfirm"
                                   placeholder="Confirm Password"
                                   className={setFieldClass(
                                       touched.passwordConfirm, errors.passwordConfirm)} />
                            <ErrorMessage name="passwordConfirm" component={FormFeedback}
                                          className="field-error-feedback" />
                        </FormGroup>
                        <Button type="submit" disabled={!(dirty && isValid)} color="danger" block>Sign Up</Button>
                        <p className="have-account-text text-container with-image-underlay">Have an account? <Link className="login-link" to="/user/login">Log in here.</Link></p>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default SignUpForm;
