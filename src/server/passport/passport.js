import localStrategy from "./localStrategy.js";
import googleStrategy from "./googleStrategy.js";
import User from '../../models/User.js';

const strategy = (passport) => {
    passport.use(localStrategy());
    passport.use(googleStrategy());

    passport.serializeUser((id, done) => {
        done(null, id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

export default strategy;
