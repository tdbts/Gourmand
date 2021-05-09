import express from 'express';
import _ from 'underscore';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../../../models/User.js';
import signUpValidationSchema from "../../../common/signUpValidationSchema.js";

const router = express.Router();

const onFatalError = (e, res) => {
    console.error("Something went wrong during user registration.");
    console.err(e);
    res.send(500);
};

const registerUser = (userInput, res) => {
    const registrationData = _.pick(userInput, 'username', 'email', 'password');
    const newUser = new User(registrationData);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }

            newUser.password = hash;
            newUser.save()
                .then(user => {
                    const {username, email} = user;
                    console.log("Successfully registered user: ", { username, email });
                    res.status(200).json({username, email, success: true});
                })
                .catch(e => onFatalError(e, res));
        });
    });
};

router.post('/signup', (req, res) => {
   const userInput = _.pick(req.body, 'username', 'email', 'password', 'passwordConfirm');

   signUpValidationSchema.validate(userInput)
       .catch(err => {
           const { errors } = err;
           console.log("Signup validation error: ", err);
           console.log("Errors: ", errors);

           res.status(400).json({ errors, success: false });
       })
       .then(() => User.findOne({ email: userInput.email }))
       .then(user => {
           if (user) {
               res.status(400)
                   .json({
                       errors: ["Email is already registered."],
                       success: false
                   });
           } else {
               registerUser(userInput, res);
           }
       })
       .catch(e => onFatalError(e, res));
});

router.post('/login', (req, res, next) => {
    console.log("/login");
    console.log("req.body:", req.body);
    passport.authenticate('local', {}, (err, user, info) => {
        console.log("Checking result of local strategy authentication.");

        if (err) {
            console.err(err);
            return next(err);
        }

        console.log("user:", user);
        console.log("info:", info);

        if (user) {
            const userInfo = _.pick(user, 'username', 'id');
            console.log("userInfo: ", userInfo);
            res.json({ ...userInfo, success: true, info });
        } else {
            res.json({ success: false, errors: [info.message] });
        }
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true });
});

export default router;
