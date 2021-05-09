import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';

const strategy = (passport) => {
    passport.use(
        new LocalStrategy( { usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
            console.log("Attempting to find user by email: ", email);
            // Match user
            User.findOne({ email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'Email is not registered' });
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password is incorrect' });
                        }
                    });
                })
                .catch(e => done(e));
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

export default strategy;
