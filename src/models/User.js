import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    authType: {
        type: String,
        required: true,
        default: 'local'
    },
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
        type: String
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

// Should only be necessary for server-side manipulation, as Mongoose will handle serialization over the wire
userSchema.methods.getLikedMediaJSON = function getLikedMediaJSON() {
    return this._convertMongooseEntityToJSON(this.likedMedia);
};

// Should only be necessary for server-side manipulation, as Mongoose will handle serialization over the wire
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

userSchema.methods.serialize = function serialize() {
    const { _id: id, username, email } = this;

    return {
        id,
        username,
        email,
        likedMedia: this.getLikedMediaJSON(),
        notes: this.getNotesJSON()
    };
};

const User = mongoose.model('User', userSchema);

export default User;
