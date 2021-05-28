import './RestaurantsList.css';
import Restaurant from "../../Restaurant/Restaurant";

const RestaurantsList = ({ restaurantProps, restaurantIDs }) => (
    <div className="restaurants-list">
        { restaurantIDs.map((id) => <Restaurant key={id} id={id} {...restaurantProps} />) }
    </div>
);

export default RestaurantsList;
