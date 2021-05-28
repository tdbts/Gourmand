class User {

    constructor(id, username, email, likedMedia, notes) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.likedMedia = likedMedia;
        this.notes = notes;
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

    getNotes() {
        return this.notes;
    }

    setNotes(notes) {
        this.notes = notes;
    }

    isAuthenticated() {
        return true;
    }

}

export default User;
