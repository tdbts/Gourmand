import { useState, Fragment } from "react";
import FlashMessages from "../../App/common/FlashMessages/FlashMessages";

const filterMessageByIndex = (messages, setter, i) => setter(messages.filter((message, j) => i !== j));

const useFlashMessages = (timeout = 250, duration = 5000) => {
    const [ successMessages, setSuccessMessages ] = useState([]);
    const [ infoMessages, setInfoMessages ] = useState([]);
    const [ errorMessages, setErrorMessages ] = useState([]);

    const messageConfigs = {
        success: {
            messages: successMessages,
            setter: setSuccessMessages
        },
        info: {
            messages: infoMessages,
            setter: setInfoMessages
        },
        error: {
            messages: errorMessages,
            setter: setErrorMessages
        }
    };

    const messages = Object.keys(messageConfigs)
        .map(level => {
            const { messages, setter } = messageConfigs[level];
            return (
                <FlashMessages
                    key={level}
                    level={level}
                    timeout={timeout}
                    duration={duration}
                    messages={messages}
                    onClose={i => filterMessageByIndex(messages, setter, i)}
                />
            );
        });

    return {
        setSuccessMessages,
        setInfoMessages,
        setErrorMessages,
        messages
    };
};

export default useFlashMessages;
