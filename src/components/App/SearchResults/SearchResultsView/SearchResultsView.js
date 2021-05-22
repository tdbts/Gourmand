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

const SearchResultsView = ({ galleryProps, restaurantProps }) => {
    const [ listView, setListView ] = useState(false);

    return (
        <div className="search-results-container">
            <Nav className="search-results-view-options" tabs>
                <NavItem className="search-results-view-option-button">
                    <NavLink href="#" active={!listView} onClick={() => setListView(false)}>
                        <GridIcon />
                    </NavLink>
                </NavItem>
                <NavItem className="search-results-view-option-button">
                    <NavLink href="#" active={listView} onClick={() => setListView(true)}>
                        <ListIcon />
                    </NavLink>
                </NavItem>
            </Nav>
            {
                listView
                    ? <RestaurantsList {...{ restaurants: galleryProps.restaurants, restaurantProps }} />
                    : <ShuffledGallery {...galleryProps} />
            }
        </div>

    );
};

export default SearchResultsView;
