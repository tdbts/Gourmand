export default {
    EVENT_TRACKING_TOKEN: (process.env.NODE_ENV === 'production')
        ? process.env.REACT_APP_EVENT_TRACKING_TOKEN
        : "dadd0494ac9b4ff110cc4a52ba61a65a"
}
