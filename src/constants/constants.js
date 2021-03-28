import getEventTrackingToken from "./getEventTrackingToken";

export default {
    EVENT_TRACKING_TOKEN: getEventTrackingToken(window.location.hostname)
}
