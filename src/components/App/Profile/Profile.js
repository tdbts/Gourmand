import './Profile.css';
import RestaurantsList from "../common/RestaurantsList/RestaurantsList";
import {useAuth} from "../../utils/auth/useAuth";
import {Fragment, useEffect, useState} from "react";
import {Input, InputGroup, InputGroupAddon} from "reactstrap";
import Fuse from 'fuse.js';

const Profile = ({ restaurantProps }) => {
    const auth = useAuth();
    const [profileDetails, setProfileDetails] = useState(null);
    const [filterQuery, setFilterQuery] = useState('');
    const [filterData, setFilterData] = useState(null);

    const { getRestaurantDataByID } = restaurantProps;

    useEffect(() => {
        auth.getProfileDetails()
            .then(profileDetails => {
                console.log("profileDetails:", profileDetails);
                setProfileDetails(profileDetails);
            })
            .catch(e => {
                throw e;
            });
    }, []);

    useEffect(() => {
        if (profileDetails && !filterData) {
            const { restaurantIDs, notes } = profileDetails;

            Promise.all(restaurantIDs.map(getRestaurantDataByID))
                .then(restaurants => {
                    console.log("restaurants:", restaurants);
                    const filterData = restaurants.map(restaurant => ({
                        ...restaurant,
                        notes: (restaurant.id in notes)
                            ? notes[restaurant.id]
                            : []
                    }));
                    console.log("filterData:", filterData);
                    setFilterData(filterData);
                })
                .catch(e => {
                    throw e;
                });
        }
    }, [profileDetails])

    const getRestaurantIDs = (profileDetails, filterQuery, filterData) => {
        if (filterQuery) {
            const fuse = new Fuse(filterData, {
                keys: ['address', 'categories', 'name', 'neighborhoods', 'notes'],
                includeScore: true,
                includeMatches: true,
                threshold: 0.3
            });

            return fuse.search(filterQuery).map(result => result.item.id);
        }

        return profileDetails.restaurantIDs;
    };

    if (!profileDetails)
        return null;

    return (
        <div className="user-profile">
            {
                profileDetails?.restaurantIDs?.length
                    ? (
                        <Fragment>
                            <InputGroup className="filter-input-group">
                                <Input className="filter-input" type="text" value={filterQuery} onChange={e => setFilterQuery(e.target.value)} placeholder="Filter restaurants" />
                            </InputGroup>
                            <RestaurantsList {...{ restaurantIDs: getRestaurantIDs(profileDetails, filterQuery, filterData), restaurantProps }} />
                        </Fragment>
                    )
                    : (
                        <div className="no-profile-container" style={{backgroundImage: 'url(/feature-not-available-background.jpg)'}}>
                            <div className="contrast-overlay" />
                            <div className="no-profile-content text-container with-image-underlay">
                                <h2 className="no-profile-content-header">We don't know <span className="feature-phrase">your favorite spots,</span> yet.</h2>
                                <p className="no-profile-content-message">Start by searching for restaurants in your area.</p>
                                <p className="no-profile-content-message">Then, heart images you like or write notes for places so you can find them later.</p>
                                <p className="no-profile-content-message">When you're hungry, come back here to filter your favorites for your next great meal.</p>
                            </div>
                        </div>
                    )
            }
        </div>
    )
};

export default Profile;
