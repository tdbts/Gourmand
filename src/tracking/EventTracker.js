import mixpanel from 'mixpanel-browser';

class EventTracker {

    static events = {
        PAGE_VISIT: 'PAGE_VISIT',
        NAVIGATE: 'NAVIGATE',
        REQUEST_CURRENT_LOCATION: 'REQUEST_CURRENT_LOCATION',
        SEARCH: 'SEARCH',
        FILTER_BY_DISTANCE: 'FILTER_BY_DISTANCE',
        SHOW_LIKED_MEDIA: 'SHOW_LIKED_MEDIA',
        SHOW_ALL_MEDIA: 'SHOW_ALL_MEDIA',
        CLICK_GALLERY_MEDIA: 'CLICK_GALLERY_MEDIA',
        LIKE_MEDIA: 'LIKE_MEDIA',
        UNLIKE_MEDIA: 'UNLIKE_MEDIA',
        OPEN_MAP: 'OPEN_MAP',
        ERROR: 'ERROR'
    };

    constructor(token, links = []) {
        validateArguments(token, links);

        mixpanel.init(token);

        // links.forEach(link => mixpanel.track_links(link.selector, link.event, link.properties));
    }

    track(event, properties) {
        mixpanel.track(event, properties);
    }

}

function validateArguments(token, links) {
    if (!token) {
        throw new Error("No token.");
    }

    if (links.length) {
        console.debug("Links to track:", links);
    } else {
        console.debug("No links given to track.");
    }
}

export default EventTracker;
