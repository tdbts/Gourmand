import EventTracker from "../../../tracking/EventTracker";
import constants from '../../../constants/constants'

const { events } = constants;
const eventTracker = new EventTracker(constants.EVENT_TRACKING_TOKEN);

const trackNavigation = (pathname) => {
    eventTracker.track(events.NAVIGATE, { pathname });
}

const withNavigationTracking = Link => ({ to, onClick, ...props }) => (
    <Link to={to} onClick={() => trackNavigation(to) && onClick && onClick() } {...props} />
);

export default withNavigationTracking;
