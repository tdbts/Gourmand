import './SignUpForm.css';
import { FormGroup, FormFeedback } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SpinnerButton from "../../common/SpinnerButton/SpinnerButton";
import setFieldClass from "../../../utils/setFieldClass";

// TODO: Open issue - Webkit autocomplete classes hide validation icons in form fields
const SignUpForm = ({ submitting, initialValues, validationSchema, onSubmit }) => {
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
                            <Field required type="text" name="username" placeholder="Username"
                                   className={setFieldClass(touched.username, errors.username)} />
                            <ErrorMessage name="username" component={FormFeedback}
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
                        <SpinnerButton spin={submitting} text={"Sign Up"} disabled={!(dirty && isValid)} color="danger" block />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default SignUpForm;
