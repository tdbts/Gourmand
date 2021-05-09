import User from './User';
import NullUser from "./NullUser";

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
    console.log("response:", response);

    if (response.status >= 500) {
        throw new Error("Something went wrong.");
    }

    return response.json();
};

const setUserOnSuccess = (json, auth) => {
    console.log("json: ", json);

    if (json.success) {
        auth.setUser(new User(json.id, json.username));
    }

    return json;
};

class Auth {

    constructor(user) {
        this.user = user ? user : new NullUser();
    }

    setUser(user) {
        this.user = user;
    }

    getUser() {
        return this.user;
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

    sendPasswordResetEmail() {

    }

    confirmPasswordReset() {

    }

}

export default Auth;
