const getGoogleAnalyticsID = (hostname) => {
    let id = null;

    if (hostname.includes("gourmandizer-staging")) {
        id = "UA-193188133-1";
    } else if (hostname.includes("gourmandizer")) {
        id = "UA-193112804-1";
    }

    return id;
};

export default getGoogleAnalyticsID;
