import './FlashMessages.css';
import FlashMessage from "./FlashMessage/FlashMessage";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FlashMessages = ({ id, timeout, duration, level, messages, onClose }) => {
    return (
        <TransitionGroup className="flash-message-container">
            {messages.map((message, i) => (
                <CSSTransition
                    key={i}
                    timeout={timeout}
                    classNames={"flash-message"}
                >
                    <FlashMessage
                        className="text-container"
                        id={id}
                        level={level}
                        message={message}
                        onClose={() => onClose(i)}
                        duration={duration}
                    />
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

export default FlashMessages;
