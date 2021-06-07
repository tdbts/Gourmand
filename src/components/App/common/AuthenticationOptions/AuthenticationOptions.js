import './AuthenticationOptions.css';
import {
    Button
} from 'reactstrap';
import EmailIcon from "../../common/Icons/EmailIocn.js";
import GoogleIcon from "../../common/Icons/GoogleIcon.js";

const AuthenticationOptions = ({optionActions, actionText}) => (
    <div className="authentication-options-container">
        <Button className="authentication-option-button email-option" color="primary" onClick={() => optionActions.email && optionActions.email()} block><EmailIcon className="option-icon email-icon" />{` ${actionText} with email`}</Button>
        <Button className="authentication-option-button google-option" color="danger" onClick={() => optionActions.google && optionActions.google()} block>
            <a href={`${process.env.REACT_APP_API_URL}/user/auth/google`}><GoogleIcon className="option-icon google-icon" /> {` ${actionText} with Google`}</a>
        </Button>
    </div>
);

export default AuthenticationOptions;
