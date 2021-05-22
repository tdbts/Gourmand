import './RestaurantsList.css';
import Restaurant from "../../Restaurant/Restaurant";
import { Fragment } from "react";

const RestaurantsList = ({ restaurantProps, restaurants }) => (
    <Fragment>
        { restaurants.map(({ id }) => <Restaurant key={id} id={id} {...restaurantProps} />) }
    </Fragment>
);

export default RestaurantsList;
