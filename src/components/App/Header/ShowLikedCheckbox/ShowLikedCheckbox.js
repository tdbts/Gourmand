import './ShowLikedCheckbox.css';
import {FormGroup, Input, Label} from "reactstrap";

function ShowLikedCheckbox({onChange}) {
    return (
        <FormGroup className={"header-check filter-liked-check"} check>
            <Label check>
                <Input type="checkbox" onChange={e => onChange(e.target.checked)} />
                <span className={"header-check-text"}>Show Liked</span>
            </Label>
        </FormGroup>
    );
}

export default ShowLikedCheckbox;