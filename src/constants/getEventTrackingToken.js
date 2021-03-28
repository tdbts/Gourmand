const getEventTrackingToken = (hostname) => {
    let token;

    if (hostname.includes("gourmandizer-staging")) {
        token = "a830086578bb9aecf1a2debcd5d38c5b";
    } else if (hostname.includes("gourmandizer")) {
        token = "2a1b0bd737f71a28f4dd2ff3f6f65baa";
    } else {
        token = "dadd0494ac9b4ff110cc4a52ba61a65a";
    }

    return token;
};

export default getEventTrackingToken;
