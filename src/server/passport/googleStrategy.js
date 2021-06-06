import passportGoogle from 'passport-google-oauth';
import DAO from "../../data/DAO.js";
import User from "../../models/User.js";

const dao = new DAO();
const GoogleStrategy = passportGoogle.OAuth2Strategy

/*
* Google strategy used for both signup and login.  Callback handles both cases.
* */
const verifyCallback = (req, accessToken, refreshToken, profile, done) => {
    const email = profile.emails.find(email => email.verified) || profile.emails[0];

    // Check if user exists
    return User.findOne({ email: email.value })
        .then(user => {
            if (user) {
                return done(null, { user, isNew: false });
            }

            // User does not exist, so register new user
            const registrationData = {
                provider: profile.provider,
                providerId: profile.id,
                username: profile.name.givenName,
                email: email.value,
                password: null
            };
            const newUser = new User({ authType: 'google', ...registrationData });

            return dao.saveUser(newUser)
                .then(() => done(null, { user: newUser, isNew: true }));
        })
        .catch(done);
};

const googleStrategy = () => {
    const strategyOptions = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.REACT_APP_API_URL}/user/auth/google/callback`,
        passReqToCallback: true
    };

    return new GoogleStrategy(strategyOptions, verifyCallback);
};

export default googleStrategy;
