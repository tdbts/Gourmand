import getEventTrackingToken from "./getEventTrackingToken.js";
import getGoogleAnalyticsID from "./getGoogleAnalyticsID.js";
import events from './events.js';

export default {
    events,
    GOOGLE_ANALYTICS_ID: getGoogleAnalyticsID(window?.location?.hostname)
}
