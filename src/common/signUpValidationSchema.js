import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(1, "Username is too short.")
        .max(50, "Username is too long.")
        .required("Username is required."),
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
        .required("Password confirmation is required.")
        .min(8, "Passwords do not match.")
        .when("password", {
            is: val => (val && (val.length > 0)),
            then: Yup.string()
                .oneOf(
                    [Yup.ref("password"), null],
                    "Passwords do not match."
                )
        })
});

export default validationSchema;
