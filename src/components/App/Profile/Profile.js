import RestaurantsList from "../common/RestaurantsList/RestaurantsList";
import {useAuth} from "../../utils/auth/useAuth";
import {useEffect, useState} from "react";

const Profile = ({ restaurantProps }) => {
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
        <div className="user-profile">
            {
                profileDetails && profileDetails.restaurantIDs.length
                    ? <RestaurantsList {...{ restaurantIDs: profileDetails.restaurantIDs, restaurantProps }} />
                    : <p className="no-profile-content-message">Like images or make restaurant notes in order to generate profile content.</p>
            }
        </div>
    )
};

export default Profile;
