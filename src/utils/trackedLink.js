const trackedLink = (selector, event, url) => {
    const link = { selector, event };

    if (url) {
        link.properties = { url };
    }

    return link;
};

export default trackedLink;
