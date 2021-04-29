import './FlashMessage.css';

const getLevelClass = (level) => {
    const prefix = 'flash-message';

    if ((level === 'error') || (level === 'warn')) {
        return `${prefix}-${level}`;
    }

    return `${prefix}-info`;
};

const FlashMessage = ({ level, message, className, onClose, duration }) => {
    setTimeout(onClose, duration);

    return (
        <div className={`flash-message ${getLevelClass(level)} ${className || ''}`}>
            <div className="flash-message-text">{message}</div>
            <button type="button" className="close" aria-label="Close" onClick={onClose}><span aria-hidden="true">×</span></button>
        </div>
    );
};

export default FlashMessage;
