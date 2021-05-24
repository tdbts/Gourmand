import FeatureNotAvailable from "../common/FeatureNotAvailable/FeatureNotAvailable";
import {useAuth} from "../../utils/auth/useAuth";
import {useEffect, useState} from "react";

const Profile = ({}) => {
    const auth = useAuth();
    const [profileDetails, setProfileDetails] = useState(null);

    useEffect(() => {
        auth.getProfileDetails()
            .then(profileDetails => {
                console.log("profileDetails:", profileDetails);
                setProfileDetails(profileDetails);
            })
            .catch(e => {
                throw e;
            });
    }, [])

    return (
        <FeatureNotAvailable featureName="profile" />
    );
};

export default Profile;
