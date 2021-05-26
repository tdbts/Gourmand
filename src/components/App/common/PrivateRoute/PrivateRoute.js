import { Route, Redirect } from 'react-router-dom';
import {useEffect, useState} from "react";

const PrivateRoute = ({ children, auth, redirect, ...rest }) => {
    const [checkAuthentication, setCheckAuthentication] = useState(true);

    useEffect(() => {
        if (checkAuthentication) {
            if (auth.hasCheckedAuthentication()) {
                setCheckAuthentication(false);
            } else {
                auth.authenticate()
                    .then(() => setCheckAuthentication(false));
            }
        }
    }, [checkAuthentication]);

    if (!auth.hasCheckedAuthentication())
        return null;

    return (
        <Route {...rest} render={({location}) => {
            return auth.isAuthenticated()
                ? children
                : <Redirect to={{
                    pathname: redirect,
                    state: {from: location}
                }}/>
        }}/>
    );
};

export default PrivateRoute;
