import mixpanel from 'mixpanel-browser';

class EventTracker {

    constructor(token) {
        console.log(`Initialize event tracker with token: ${token}`);
        mixpanel.init(token, {cross_site_cookie: true});
    }

    track(event, properties) {
        console.log(`
            Tracking event: ${event}
            ${properties 
                ? "Properties: " + JSON.stringify(properties)
                : ""}`);
        mixpanel.track(event, properties);
    }

}

export default EventTracker;
