import './SpinnerButton.css';
import { Button } from 'reactstrap';

const getButtonContent = (spin, text) => spin
    ? <img className="submitting-spinner rotate" src="/spinner.png" />
    : text;

const SpinnerButton = ({ spin, text, ...props }) => (
    <Button type="submit" { ...props }>{ getButtonContent(spin, text) }</Button>
);

export default SpinnerButton;
