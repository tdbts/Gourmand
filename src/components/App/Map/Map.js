import FeatureNotAvailable from "../common/FeatureNotAvailable/FeatureNotAvailable";
import { Redirect } from 'react-router-dom';
import {useAuth} from "../../utils/auth/useAuth";

const Map = ({}) => {
    const auth = useAuth();

    return auth.isAuthenticated()
        ? <FeatureNotAvailable featureName="map" />
        : <Redirect to="/user/login" />
};

export default Map;
