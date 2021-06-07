import mixpanel from 'mixpanel';
import mixpanelBrowser from 'mixpanel-browser';
import getEventTrackingToken from "../constants/getEventTrackingToken.js";
import EventTracker from "./EventTracker.js";

const getMixpanelInstance = (type, token, initOptions) => {
    if (type === EventTrackerFactory.types.BROWSER) {
        mixpanelBrowser.init(token, initOptions);
        return mixpanelBrowser;
    } else {
        return mixpanel.init(token, initOptions);
    }
}

class EventTrackerFactory {

    static types = {
        BROWSER: 'BROWSER',
        SERVER: 'SERVER'
    };

    static getTracker(type, hostname) {
        const initOptions = (type === EventTrackerFactory.types.BROWSER)
            ? {cross_site_cookie: true}
            : {};

        return new EventTracker(
            getMixpanelInstance(type, getEventTrackingToken(hostname), initOptions),
            getEventTrackingToken(hostname)
        );
    }

}

export default EventTrackerFactory;
