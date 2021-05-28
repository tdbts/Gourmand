import User from './User';
import NullUser from "./NullUser";
import LikedMedia from "../user/LikedMedia";

const requestOptions = {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

const checkResponseForErrors = response => {
    if (response.status >= 500) {
        throw new Error("Something went wrong.");
    }

    return response.json();
};

const setUserOnSuccess = (json, auth) => {
    console.log("json: ", json);

    if (json.success) {
        auth.setUser(new User(
            json.id,
            json.username,
            json.email,
            new LikedMedia(LikedMedia.setify(json.likedMedia)),
            json.notes));
    }

    return json;
};

class Auth {

    constructor(user) {
        this.user = user ? user : new NullUser();
        this.authChecked = false;
        this.lastAuthCheck = null;
    }

    setUser(user) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    authenticate() {
        if (this.lastAuthCheck)
            return this.lastAuthCheck;

        this.lastAuthCheck = fetch('/user/authenticate', {
                ...requestOptions
            })
            .then(checkResponseForErrors)
            .then(json => setUserOnSuccess(json, this))
            .then(json => {
                this.authChecked = true;
                return json;
            })
            .catch(e => {
                this.lastAuthCheck = null;
                throw e;
            });

        return this.lastAuthCheck;
    }

    hasCheckedAuthentication() {
        return this.authChecked;
    }

    isAuthenticated() {
        return this.getUser().isAuthenticated();
    }

    logIn(credentials) {
        return fetch('/user/login', {
                ...requestOptions,
                method: 'POST',
                body: JSON.stringify(credentials)
            })
            .then(checkResponseForErrors)
            .then(json => setUserOnSuccess(json, this));
    }

    logOut() {
        return fetch('/user/logout', {
                ...requestOptions,
                method: 'GET'
            })
            .then(response => {
                console.log("response:", response);
                this.setUser(new NullUser());
            });
    }

    signUp(values) {
        return fetch('/user/signup', {
                ...requestOptions,
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify(values) // body data type must match "Content-Type" header
            })
            .then(checkResponseForErrors)
            .then(json => setUserOnSuccess(json, this));
    }

    getLiked() {
        return fetch('/user/liked', {...requestOptions})
            .then(checkResponseForErrors);
    }

    like(likedMedia) {
        return fetch('/user/like', {
                ...requestOptions,
                method: 'POST',
                body: JSON.stringify({ likedMedia })
            })
            .then(checkResponseForErrors)
            .then(json => {
                this.user.setLikedMedia(new LikedMedia(LikedMedia.setify(json.likedMedia)));
                return json;
            });
    }

    unlike(unlikedMedia) {
        return fetch('/user/unlike', {
                ...requestOptions,
                method: 'POST',
                body: JSON.stringify({ unlikedMedia })
            })
            .then(checkResponseForErrors)
            .then(json => {
                this.user.setLikedMedia(new LikedMedia(LikedMedia.setify(json.likedMedia)));
                return json;
            });
    }

    getNotes(restaurantID) {
        const params = new URLSearchParams({ restaurantID });
        return fetch(`/user/notes?${params}`, {
                ...requestOptions
            })
            .then(checkResponseForErrors);
    }

    updateNotes(restaurantID, notes) {
        return fetch('/user/notes', {
                ...requestOptions,
                method: 'POST',
                body: JSON.stringify({ notes: { [restaurantID]: notes }})
            })
            .then(checkResponseForErrors)
            .then(json => {
                this.user.setNotes(json.notes);
                return json;
            });
    }

    getProfileDetails() {
        return fetch('/user/profile-details', { ...requestOptions })
            .then(checkResponseForErrors);
    }

    performIfAuthenticated(action) {
        return this.authenticate()
            .then(() => {
                if (this.isAuthenticated()) {
                    return action();
                }
            })
            .catch(e => {
                throw e;
            });
    }

    sendPasswordResetEmail() {

    }

    confirmPasswordReset() {

    }

}

export default Auth;
