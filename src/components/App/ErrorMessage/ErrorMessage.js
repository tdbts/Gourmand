import './ErrorMessage.css';

const ErrorMessage = ({error}) => {
	return (
		<div className="error-message-container">
			<div className="error-apology">Oops, something went sour.</div>
			<div className="error-message">"{error.message}"</div>
		</div>
	);
};

export default ErrorMessage;