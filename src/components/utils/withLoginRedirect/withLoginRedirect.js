import { useState } from "react";
import { useAuth } from "../auth/useAuth.js";
import {Redirect, useLocation} from "react-router-dom";

const withLoginRedirect = Component => ({ onRedirect, ...props }) => {
    const [ redirectToLogin, setRedirectToLogin ] = useState(false);
    const auth = useAuth();
    const location = useLocation();

    const redirectIfUnauthenticated = action => () => {
        if (auth.isAuthenticated()) {
            return action();
        } else {
            setRedirectToLogin(true);
        }
    };

    if (redirectToLogin) {
        if (onRedirect) {
            onRedirect();
        }

        return <Redirect to={{
            pathname: '/user/login',
            state: { from: location.pathname },
            push: true
        }} />;
    }

    return (
        <Component {...{ ...props, setRedirectToLogin, redirectIfUnauthenticated }} />
    );
};

export default withLoginRedirect;
