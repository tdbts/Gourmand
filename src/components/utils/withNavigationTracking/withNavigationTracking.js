import EventTracker from "../../../tracking/EventTracker";
import constants from '../../../constants/constants'
import EventTrackerFactory from "../../../tracking/EventTrackerFactory.js";

const { events } = constants;
const eventTracker = EventTrackerFactory.getTracker(EventTrackerFactory.types.BROWSER, window.location.hostname);

const trackNavigation = (pathname) => {
    eventTracker.track(events.NAVIGATE, { pathname });
}

const withNavigationTracking = Link => ({ to, onClick, ...props }) => (
    <Link to={to} onClick={() => trackNavigation(to) && onClick && onClick() } {...props} />
);

export default withNavigationTracking;
