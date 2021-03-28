import './DistanceDropdown.css';
import { useState } from 'react';
import constants from "../../../../scrapers/yelp/constants";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const { distances } = constants;
const dropdownTextContents = {
    DEFAULT: "Distance",
    options: [
        "Bird's-eye View",
        "Driving (5 mi.)",
        "Biking (2 mi.)",
        "Walking (1 mi.)",
        "Within 4 Blocks"
    ]
};

const DistanceDropdown = ({distance, onDistanceDropdownClick}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Dropdown className="distance-dropdown" isOpen={isOpen} toggle={toggle} size="sm" outline={true} color="secondary">
            <DropdownToggle caret>{getDropdownText(distance)}</DropdownToggle>
            <DropdownMenu positionFixed={true}>
                <DropdownItem onClick={() => onDistanceDropdownClick(distances.BLOCKS)}>Within 4 Blocks</DropdownItem>
                <DropdownItem onClick={() => onDistanceDropdownClick(distances.WALKING)}>Walking (1 mi.)</DropdownItem>
                <DropdownItem onClick={() => onDistanceDropdownClick(distances.BIKING)}>Biking (2 mi.)</DropdownItem>
                <DropdownItem onClick={() => onDistanceDropdownClick(distances.DRIVING)}>Driving (5 mi.)</DropdownItem>
                <DropdownItem onClick={() => onDistanceDropdownClick(distances.BIRDS_EYE)}>Bird's-eye View</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

function getDropdownText(distance) {
    return (distance === distances.UNKNOWN)
        ? dropdownTextContents.DEFAULT
        : dropdownTextContents.options[distance];
}

export default DistanceDropdown;
