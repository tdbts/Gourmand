import localStrategy from "./localStrategy";
import User from '../../src/models/User.js';

const strategy = (passport) => {
    passport.use(localStrategy());

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
