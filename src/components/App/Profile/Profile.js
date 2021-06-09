import './Profile.css';
import RestaurantsList from "../common/RestaurantsList/RestaurantsList";
import {useAuth} from "../../utils/auth/useAuth";
import {Fragment, useEffect, useState} from "react";
import {Input, InputGroup } from "reactstrap";
import Fuse from 'fuse.js';

const getFilterData = (restaurants, notes) => {
    return restaurants.map(restaurant => ({
        ...restaurant,
        notes: (restaurant.id in notes)
            ? notes[restaurant.id]
            : []
    }));
};

const getUserRestaurantIDs = (user) => {
    const { likedMedia, notes } = user;
    // Ensure unique
    const restaurantIDs = new Set([].concat(Object.keys(likedMedia.listify()), Object.keys(notes)));
    // console.log("restaurantIDs:", restaurantIDs);
    return Array.from(restaurantIDs);
};

const Profile = ({ restaurantProps }) => {
    const auth = useAuth();
    const [filterQuery, setFilterQuery] = useState('');
    const [userRestaurants, setUserRestaurants] = useState([]);

    const { getRestaurantDataByID } = restaurantProps;

    useEffect(() => {
        const userRestaurantIDs = getUserRestaurantIDs(auth.getUser());
        const currentRestaurantIDs = userRestaurants.map(restaurant => restaurant.id);

        if ((userRestaurantIDs.length !== userRestaurants.length) || userRestaurantIDs.some(id => !currentRestaurantIDs.includes(id))) {
            Promise.all(userRestaurantIDs.map(getRestaurantDataByID))
                .then(setUserRestaurants)
                .catch(e => {
                    throw e;
                });
        }
    }, [userRestaurants]);

    const getRestaurantIDs = (restaurantIDs, filterQuery, filterData) => {
        if (filterQuery) {
            const fuse = new Fuse(filterData, {
                keys: ['address', 'categories', 'name', 'neighborhoods', 'notes'],
                includeScore: true,
                includeMatches: true,
                threshold: 0.3
            });

            return fuse.search(filterQuery).map(result => result.item.id);
        }

        return restaurantIDs;
    };

    const userRestaurantIDs = getUserRestaurantIDs(auth.getUser());

    const restaurantIDs = getRestaurantIDs(
        userRestaurantIDs,
        filterQuery,
        getFilterData(userRestaurants, auth.getUser().getNotes())
    );

    return (
        <div className="user-profile">
            {
                userRestaurantIDs.length
                    ? (
                        <Fragment>
                            <InputGroup className="filter-input-group">
                                <Input className="filter-input" type="text" value={filterQuery} onChange={e => setFilterQuery(e.target.value)} placeholder="Search saved restaurants" />
                            </InputGroup>
                            <RestaurantsList {...{ restaurantIDs, restaurantProps }} />
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
