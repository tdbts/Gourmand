import './RestaurantsList.css';
import Restaurant from "../../Restaurant/Restaurant";

const RestaurantsList = ({ restaurantProps, restaurants }) => (
    <div className="restaurants-list">
        { restaurants.map(({ id }) => <Restaurant key={id} id={id} {...restaurantProps} />) }
    </div>
);

export default RestaurantsList;
