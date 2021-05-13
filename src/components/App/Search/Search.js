import FeatureNotAvailable from "../common/FeatureNotAvailable/FeatureNotAvailable";
import { Redirect } from 'react-router-dom';
import {useAuth} from "../../utils/auth/useAuth";

const Search = ({}) => {
    const auth = useAuth();

    return auth.isAuthenticated()
        ? <FeatureNotAvailable featureName="search" />
        : <Redirect to="/user/login" />
};

export default Search;
