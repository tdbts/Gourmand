import express from 'express';
import _ from 'underscore';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../../../models/User.js';
import signUpValidationSchema from "../../../common/signUpValidationSchema.js";
import DAO from "../../../data/DAO.js";
import LikedMedia from "../../../user/LikedMedia.js";

const router = express.Router();
const dao = new DAO();

const onFatalError = (e, res) => {
    console.error("Something went wrong during user registration.");
    console.error(e);
    res.send(500);
};

const registerUser = (userInput, req, res) => {
    console.log("Registering new user.");
    const registrationData = _.pick(userInput, 'username', 'email', 'password', 'likedMedia');
    const newUser = new User(registrationData);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }

            newUser.password = hash;
            dao.saveUser(newUser)
                .then(user => {
                    const {_id: id, username, email, likedMedia} = user;
                    console.log("Successfully registered user: ", { username, email });
                    req.login(id, err => {
                        if (err) {
                            res.status(500);
                        }

                        res.status(200).json({success: true, id, username, email, likedMedia });
                    });
                })
                .catch(e => onFatalError(e, res));
        });
    });
};

router.post('/signup', (req, res) => {
   const userInput = _.pick(req.body, 'username', 'email', 'password', 'passwordConfirm', 'likedMedia');

   signUpValidationSchema.validate(userInput)
       .catch(err => {
           const { errors } = err;
           console.log("Signup validation error: ", err);
           console.log("Errors: ", errors);
           res.status(400).json({ errors, success: false });
       })
       .then(() => dao.findUserByEmail(userInput.email))
       .then(user => {
           if (user) {
               res.status(400)
                   .json({
                       errors: ["Email is already registered."],
                       success: false
                   });
           } else {
               registerUser(userInput, req, res);
           }
       })
       .catch(e => onFatalError(e, res));
});

router.post('/login', (req, res, next) => {
    console.log("/login");
    // console.log("req.body:", req.body);
    passport.authenticate('local', {}, (err, user, info) => {
        console.log("Checking result of local strategy authentication.");

        if (err) {
            console.err(err);
            return next(err);
        }

        // console.log("user:", user);
        // console.log("info:", info);

        if (user) {
            const userInfo = _.pick(user, 'id', 'username', 'email', 'likedMedia');
            console.log("userInfo: ", userInfo);
            req.login(userInfo.id, err => {
                if (err) {
                    throw err;
                }

                res.json({ ...userInfo, success: true, info });
            });
        } else {
            res.json({ success: false, errors: [info.message] });
        }
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true });
});

router.get('/authenticate', (req, res) => {
    // console.log("req.session:", req.session);
    // console.log("req.user:", req.user);
    // console.log("req.isAuthenticated():", req.isAuthenticated());
    if (req.isAuthenticated()) {
        const { username, _id: id, email, likedMedia } = req.user;
        res.json({ success: true, id, username, email, likedMedia });
    } else {
        res.json({ success: false });
    }
});

router.post('/like', (req, res) => {
   if (req.isAuthenticated()) {
       const { likedMedia } = req.body;

       if (likedMedia) {
           // Ensure that restaurant ID exists in DB
           Promise.all(
                   Object.keys(likedMedia)
                       .map(id => dao.findRestaurantByID(id)))
               // Ensure that persisted restaurant has specified media
               .then(restaurants => restaurants.map(restaurant => {
                   if (restaurant) {
                       const { id } = restaurant;

                       return {
                           // Verify that restaurant ID mapped to array
                           [id]: Array.isArray(likedMedia[id])
                               ? restaurant.verifyMediaIDs(likedMedia[id])
                               : []
                       };
                   }

                   return {};
               }))
               // Merge verified restaurant media to original object structure
               .then(verified => verified.reduce((map, obj) => ({...map, ...obj}), {}))
               // Mongoose schemas do not support Sets
               .then(verifiedLikedMedia => {
                   const { user } = req;
                   // Setify user's existing liked media and create 'LikedMedia' instance
                   const likedMedia =
                       new LikedMedia(LikedMedia.setify(user.likedMedia.toObject()));
                   // Merge, handling de-duplication
                   likedMedia.merge(verifiedLikedMedia);
                   // Return liked media to listified form after merge
                   user.likedMedia = likedMedia.listify();
                   // Persist update
                   dao.saveUser(user);
               })
               .then(likedMedia => res.json({
                   success: true
               }))
               .catch(e => {
                   throw e;
               });
       } else {
           res.status(400);
       }
   } else {
       res.status(400).json({ success: false, message: "User not authenticated." });
   }
});

router.post('/unlike', (req, res) => {
    if (req.isAuthenticated()) {
        const { unlikedMedia } = req.body;
        const { user } = req;
        const likedMedia = new LikedMedia(LikedMedia.setify(user.likedMedia.toObject()));

        if (unlikedMedia) {
            Object.keys(unlikedMedia)
                .forEach(restaurantID => unlikedMedia[restaurantID]
                    .forEach(mediaID => likedMedia.unlike(restaurantID, mediaID)));

            // Return liked media to listified form after merge
            user.likedMedia = likedMedia.listify();
            // Persist update
            dao.saveUser(user)
                .then(() => res.json({ success: true }))
                .catch(e => {
                    throw e;
                });
        } else {
            res.status(400);
        }
    } else {
        res.status(400).json({ success: false, message: "User not authenticated." });
    }
});

router.get('/liked', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ success: true, likedMedia: req.user.likedMedia });
    } else {
        res.status(400).json({ success: false, message: "User not authenticated." });
    }
})

export default router;
