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

userSchema.methods.updateLikedMedia = function updateLikedMedia(likedMedia) {
    for (const restaurantID in likedMedia) {
        if (likedMedia.hasOwnProperty(restaurantID)) {
            if (likedMedia[restaurantID].length) {
                this.likedMedia.set(restaurantID, likedMedia[restaurantID]);
            } else {
                this.likedMedia.delete(restaurantID);
            }
        }
    }
}

const User = mongoose.model('User', userSchema);

export default User;
