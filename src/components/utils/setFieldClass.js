const setValidationClass = (touched, hasError) => {
    return touched
        ? hasError
            ? "is-invalid"
            : "is-valid"
        : "";
};

const setFieldClass = (touched, hasError) => ["form-control", setValidationClass(touched, hasError)].join(" ");

export default setFieldClass;
