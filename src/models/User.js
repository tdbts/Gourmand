import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    signupDate: {
        type: Date,
        default: Date.now
    },
    likedMedia: {
        type: Map,
        of: [String],
        default: {}
    },
    notes: {
        type: Map,
        of: [String],
        default: {}
    }
});

userSchema.methods._convertMongooseEntityToJSON = function _convertMongooseEntityToJSON(entity) {
    return JSON.parse(JSON.stringify(entity));
}

userSchema.methods.getLikedMediaJSON = function getLikedMediaJSON() {
    return this._convertMongooseEntityToJSON(this.likedMedia);
};

userSchema.methods.getNotesJSON = function getNotesJSON() {
    return this._convertMongooseEntityToJSON(this.notes);
}

// Must be called with a complete depiction of the current state of the user's liked media.
// I.e., this will remove liked media that is not included in the given object.
userSchema.methods.updateLikedMedia = function updateLikedMedia(likedMedia) {
    const keyValues = [];

    for (const restaurantID in likedMedia) {
        if (likedMedia.hasOwnProperty(restaurantID)) {
            if (likedMedia[restaurantID].length) {
                keyValues.push([restaurantID, likedMedia[restaurantID]]);
            }
        }
    }

    this.likedMedia = new Map(keyValues);
}

const User = mongoose.model('User', userSchema);

export default User;
