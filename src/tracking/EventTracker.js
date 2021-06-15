import constants from "../constants/constants.js";

const { events } = constants;

class EventTracker {

    constructor(mixpanel, token) {
        console.log(`Initialize event tracker with token: ${token}`);
        this.mixpanel = mixpanel;
    }

    track(event, properties) {
        console.log(`
            Tracking event: ${event}
            ${properties 
                ? "Properties: " + JSON.stringify(properties)
                : ""}`);

        this.mixpanel.track(event, properties);

        const { email } = properties;

        if (event === events.SIGN_UP) {
            window.console.log("Aliasing user:", email);
            this.mixpanel.alias(email);
        }

        if (event === events.LOG_IN) {
            window.console.log("Identifying user:", email);
            this.mixpanel.identify(email);
        }
    }

}

export default EventTracker;
