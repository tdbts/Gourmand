import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, auth, redirect, ...rest }) => (
    <Route { ...rest } render={({ location }) => {
        return auth.isAuthenticated()
            ? children
            : <Redirect to={{
                pathname: redirect,
                state: { from: location }
            }} />
    }} />
);

export default PrivateRoute;
