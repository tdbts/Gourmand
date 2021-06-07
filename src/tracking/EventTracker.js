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
    }

}

export default EventTracker;
