import EventTracker from "../../../tracking/EventTracker";
import constants from '../../../constants/constants'

const eventTracker = new EventTracker(constants.EVENT_TRACKING_TOKEN);

const trackNavigation = (pathname) => {
    eventTracker.track(EventTracker.events.NAVIGATE, { pathname });
}

const withNavigationTracking = Link => ({ to, onClick, ...props }) => (
    <Link to={to} onClick={() => trackNavigation(to) && onClick && onClick() } {...props} />
);

export default withNavigationTracking;
