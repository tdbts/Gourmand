class User {

    constructor(id, username) {
        this.id = id;
        this.username = username;
    }

    getID() {
        return this.id;
    }

    getUserName() {
        return this.username;
    }

    isAuthenticated() {
        return true;
    }

}

export default User;
