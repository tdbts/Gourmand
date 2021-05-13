import FeatureNotAvailable from "../common/FeatureNotAvailable/FeatureNotAvailable";
import { Redirect } from 'react-router-dom';
import {useAuth} from "../../utils/auth/useAuth";

const Upload = ({}) => {
    const auth = useAuth();

    return auth.isAuthenticated()
        ? <FeatureNotAvailable featureName="upload" />
        : <Redirect to="/user/login" />
};

export default Upload;
