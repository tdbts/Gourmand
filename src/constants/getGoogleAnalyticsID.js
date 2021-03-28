const getGoogleAnalyticsID = (hostname) => {
    let id = null;

    if (hostname.includes("gourmandizer-staging")) {
        id = "G-424KDS2V7N";
    } else if (hostname.includes("gourmandizer")) {
        id = "G-GZCWVEGJ47";
    }

    return id;
};

export default getGoogleAnalyticsID;
