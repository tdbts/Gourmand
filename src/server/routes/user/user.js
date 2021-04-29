import express from 'express';
import _ from 'underscore';
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
    const registrationData = _.pick(userInput, 'name', 'email', 'password');
    const newUser = new User(registrationData);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }

            newUser.password = hash;
            newUser.save()
                .then(user => {
                    const {name, email} = user;
                    console.log("Successfully registered user: ", { name, email });
                    res.status(200).json({name, email, success: true});
                })
                .catch(e => onFatalError(e, res));
        });
    });
};

router.post('/signup', (req, res) => {
   const userInput = _.pick(req.body, 'name', 'email', 'password', 'passwordConfirm');

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

export default router;
