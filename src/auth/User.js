class User {

    constructor(id, username, email, likedMedia) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.likedMedia = likedMedia;
    }

    getID() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getLikedMedia() {
        return this.likedMedia;
    }

    setLikedMedia(likedMedia) {
        this.likedMedia = likedMedia;
    }

    isAuthenticated() {
        return true;
    }

}

export default User;
