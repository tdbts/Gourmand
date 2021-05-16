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
    }
});

const User = mongoose.model('User', userSchema);

export default User;
