import './SearchResultsView.css';
import withShuffledMedia from "../../common/Gallery/withShuffledMedia";
import Gallery from "../../common/Gallery/Gallery";
import RestaurantsList from "../../common/RestaurantsList/RestaurantsList";
import {
    Nav,
    NavItem,
    NavLink,
    ButtonGroup,
    Button
} from "reactstrap";
import GridIcon from "./GridIcon";
import ListIcon from "./ListIcon";
import { useState } from "react";

const ShuffledGallery = withShuffledMedia(Gallery);

const SearchResultsView = ({ galleryProps, restaurantProps, onViewSelection }) => {
    const [ listView, setListView ] = useState(false);

    const onViewTabClick = (value) => {
        if (value === listView)
            return;

        setListView(value);

        if (onViewSelection) {
            onViewSelection(value);
        }
    };

    const restaurantIDs = galleryProps.restaurants.map(restaurant => restaurant.id);

    return (
        <div className="search-results-container">
            <Nav className="search-results-view-options" tabs>
                <NavItem className="search-results-view-option-button">
                    <NavLink href="#" active={!listView} onClick={() => onViewTabClick(false)}>
                        <GridIcon />
                    </NavLink>
                </NavItem>
                <NavItem className="search-results-view-option-button">
                    <NavLink href="#" active={listView} onClick={() => onViewTabClick(true)}>
                        <ListIcon />
                    </NavLink>
                </NavItem>
            </Nav>
            {
                listView
                    ? <RestaurantsList {...{ restaurantIDs, restaurantProps }} />
                    : <ShuffledGallery {...galleryProps} />
            }
        </div>

    );
};

export default SearchResultsView;
