import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DistanceDropdown = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Dropdown className="distance-dropdown" isOpen={isOpen} toggle={toggle} size="sm" outline={true} color="secondary">
            <DropdownToggle caret>Distance</DropdownToggle>
            <DropdownMenu positionFixed={true}>
                <DropdownItem>Within 4 Blocks</DropdownItem>
                <DropdownItem>Walking (1 mi.)</DropdownItem>
                <DropdownItem>Biking (2 mi.)</DropdownItem>
                <DropdownItem>Driving (5 mi.)</DropdownItem>
                <DropdownItem>Bird's-eye View</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default DistanceDropdown;
