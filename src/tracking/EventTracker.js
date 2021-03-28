import mixpanel from 'mixpanel-browser';

class EventTracker {

    static events = {
        PAGE_VISIT: 'PAGE_VISIT',
        NAVIGATE: 'NAVIGATE',
        REQUEST_CURRENT_LOCATION: 'REQUEST_CURRENT_LOCATION',
        SEARCH: 'SEARCH',
        SHOW_LIKED_MEDIA: 'SHOW_LIKED_MEDIA',
        SHOW_ALL_MEDIA: 'SHOW_ALL_MEDIA',
        CLICK_GALLERY_MEDIA: 'CLICK_GALLERY_MEDIA',
        LIKE_MEDIA: 'LIKE_MEDIA',
        UNLIKE_MEDIA: 'UNLIKE_MEDIA',
        OPEN_MAP: 'OPEN_MAP',
        ERROR: 'ERROR'
    };

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
