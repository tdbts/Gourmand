import getEventTrackingToken from "./getEventTrackingToken";
import getGoogleAnalyticsID from "./getGoogleAnalyticsID";
import events from './events';

export default {
    events,
    EVENT_TRACKING_TOKEN: getEventTrackingToken(window.location.hostname),
    GOOGLE_ANALYTICS_ID: getGoogleAnalyticsID(window.location.hostname)
}
