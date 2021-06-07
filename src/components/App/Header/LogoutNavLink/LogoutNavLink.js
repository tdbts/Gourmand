import { useState, useEffect } from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {useAuth} from "../../../utils/auth/useAuth";

const LogoutNavLink = () => {
    const [ loggingOut, setLoggingOut ] = useState(false);
    const history = useHistory();
    const auth = useAuth();

    useEffect(() => {
        if (loggingOut) {
            auth.logOut()
                .then(() => history.push('/'))
                .then(() => console.log("User successfully logged out."))
                .catch(e => {
                    throw e
                });
        }
    }, [loggingOut]);

    const onClick = () => {
        setLoggingOut(true);
    };

    return (
        <NavLink id="logout-link" className="nav-link" to="#" onClick={onClick}>Log Out</NavLink>
    );
};

export default LogoutNavLink;
