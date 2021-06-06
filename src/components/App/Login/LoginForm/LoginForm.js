import './LoginForm.css';
import { FormGroup, FormFeedback } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SpinnerButton from "../../common/SpinnerButton/SpinnerButton";
import setFieldClass from "../../../utils/setFieldClass";

const LoginForm = ({ initialValues, validationSchema, onSubmit, submitting }) => {
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
                        <SpinnerButton spin={submitting} text={"Log In"} disabled={!(dirty && isValid)} color="danger" block />
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LoginForm;
