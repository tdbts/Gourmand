import FeatureNotAvailable from "../common/FeatureNotAvailable/FeatureNotAvailable";
import { Redirect } from 'react-router-dom';
import {useAuth} from "../../utils/auth/useAuth";

const Profile = ({}) => {
    const auth = useAuth();

    return auth.isAuthenticated()
        ? <FeatureNotAvailable featureName="profile" />
        : <Redirect to="/user/login" />
};

export default Profile;
